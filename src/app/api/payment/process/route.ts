import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Job from '@/models/Job';
import SuccessfulPayment from '@/models/SuccessfulPayment';
import { calculatePlatformCommission } from '@/lib/payment';
import {cookies} from 'next/headers';
import { verify } from 'jsonwebtoken';
import PaymentInfo from '@/models/PaymentInfo';
import { AlignVerticalJustifyEnd } from 'lucide-react';
// Initialize Razorpay

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get user data
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestId ,managerId,artistId} = await req.json();
    console.log(requestId, managerId, artistId , "this is requestId ");

    const job = await (Job.findOne as any)({manager : managerId});

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    console.log(job,"this is inside Job");
    const UPIDetails = await (PaymentInfo.findOne as any)({userId : artistId});

    if (!UPIDetails) {
      return NextResponse.json({ error: 'UPI details not found' }, { status: 404 });
    }

    const amount = job.salary;
    const commission = calculatePlatformCommission(amount);
    const totalAmount = amount + commission;
    console.log("amount, commission, totalAmount", amount, commission, totalAmount);
    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `job_${requestId}`,
      notes: {
        jobId: requestId,
        payerId: decoded.userId,
        receiverId: job.artistId,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      upiId : UPIDetails.upiId,
      amount: totalAmount,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const { notes } = payment;

    const successfulPayment = new SuccessfulPayment({
      amount: (payment.amount as any) / 100, 
      payer: notes.payerId,
      receiver: notes.receiverId,
      jobId: notes.jobId,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      status: 'success',
    });

    await successfulPayment.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}