import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import  connectDB  from '@/lib/db';
import User from '@/models/User';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { action, email, password, fullName, role } = await req.json();

    if (action === 'login') {
      const user = await User.findOne({email});
      console.log("Inside api/auth/route to check it ", user);
      if (!user || !(await user.comparePassword(password))) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json(
        { user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role } },
        { status: 200 }
      );

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    if (action === 'register') {
      const existingUser = await User.findByEmail(email);
      console.log(existingUser , "Inside the /api/auth");
      if (existingUser) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Email already registered' 
          },
          { status: 400 }
        );
      }
     
      const user = await User.create({
        email,
        password,
        fullName,
        role,
      });

      const token = sign(
        { userId: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json(
        { 
          success: true,
          user: { 
            id: user._id, 
            email: user.email, 
            fullName: user.fullName, 
            role: user.role 
          },
          message: 'Registration successful' 
        },
        { status: 200 }  // Changed from 201 to 200
      );

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',  // Changed from 'strict' to 'lax' for better compatibility
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
      // const existingUser = await User.findByEmail(email);
      // console.log(existingUser , "Inside the /api/auth");
      // if (existingUser) {
      //   return NextResponse.json(
      //     { error: 'Email already registered' },
      //     { status: 400 }
      //   );
      // }
     
      // const user = await User.create({
      //   email,
      //   password,
      //   fullName,
      //   role,
      // });

      // const token = sign(
      //   { userId: user._id, email: user.email, role: user.role },
      //   JWT_SECRET,
      //   { expiresIn: '7d' }
      // );

      // const response = NextResponse.json(
      //   { user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role } },
      //   { status: 201 }
      // );

      // response.cookies.set('token', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      //   maxAge: 60 * 60 * 24 * 7, // 7 days
      // });

      // return response;
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}