import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic'; // Add this line to explicitly mark as dynamic route

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };

    await connectDB();
    const user = await (User.findById as any)(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}