import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User, { IUserDocument } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const user = await (User.findOne as any)({email});
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session data
    const session = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json(session, {
      status: 200,
      headers: {
        'Set-Cookie': `session=${JSON.stringify(session)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}` // 7 days
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate user' },
      { status: 500 }
    );
  }
}