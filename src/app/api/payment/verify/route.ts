import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import  connectDB  from '@/lib/db';
import  Request  from '@/models/Request';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      requestId,
      amount,
      managerId,
      artistId,
      status
    } = body;

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const secret = process.env.RAZORPAY_KEY_SECRET || '';
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    console.log("till here api/payment/verify");
    // Connect to the database
    const client = await connectDB();

    // Update the request status and payment status in the database
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { 
        paymentStatus: status,
        status: 'ACCEPTED' // Update the request status to ACCEPTED when payment is verified
      },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Payment verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}