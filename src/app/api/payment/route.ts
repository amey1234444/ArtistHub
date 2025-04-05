import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import PaymentInfo from '@/models/PaymentInfo';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify JWT token
const verifyToken = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }
  return verify(token, JWT_SECRET) as { userId: string, role: string };
};

// Get UPI payment info for the current user
export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    await connectDB();

    const paymentInfo = await PaymentInfo.findOne({ userId: decoded.userId });
    if (!paymentInfo) {
      return NextResponse.json({ hasUpiId: false });
    }

    return NextResponse.json({
      hasUpiId: true,
      upiId: paymentInfo.upiId
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

// Create or update UPI payment info
export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    await connectDB();

    // Check if user is an artist
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'artist') {
      return NextResponse.json(
        { error: 'Only artists can set UPI payment information' },
        { status: 403 }
      );
    }

    const { upiId } = await req.json();
    if (!upiId) {
      return NextResponse.json(
        { error: 'UPI ID is required' },
        { status: 400 }
      );
    }

    // Validate UPI ID format
    const upiIdRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiIdRegex.test(upiId)) {
      return NextResponse.json(
        { error: 'Invalid UPI ID format' },
        { status: 400 }
      );
    }

    const paymentInfo = await PaymentInfo.findOneAndUpdate(
      { userId: decoded.userId },
      { upiId },
      { new: true, upsert: true }
    );

    return NextResponse.json(paymentInfo);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}