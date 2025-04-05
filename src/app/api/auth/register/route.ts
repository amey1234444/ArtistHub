import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/db';
import User, { IUserDocument,IUserModel } from '@/models/User';

export async function POST(request: Request) {
  try {
    console.log('Received request inside register api :', request);
    await connectDB();

    const body = await request.json();
    const { fullName, email, password, role } = body;

    console.log(fullName,email,password,role);
    // Check if user already exists

    const existingUser = await User.findOne({email:email.toLowerCase()});
    console.log("This is inside register route", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create<IUserDocument>({
      fullName,
      email,
      password, // Password will be hashed by the pre-save hook
      role,
    });

    // Remove password from response
    const userWithoutPassword = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}