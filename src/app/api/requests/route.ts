import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Request from '@/models/Request';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    // Get token from cookies
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

    const query = role === 'manager' 
      ? { managerId: decoded.userId }
      : { artistId: decoded.userId };

    const requests = await (Request.find as any)(query)
      .populate('artistId', 'fullName email')
      .populate('managerId', 'fullName email')
      .sort({ createdAt: -1 });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get user data
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };

    if (!decoded || !decoded.userId || decoded.role !== 'manager') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    const request = await (Request.create as any)({
      ...data,
      managerId: decoded.userId,
      status: 'PENDING',
      createdAt: new Date()
    });

    const populatedRequest = await (Request.findById as any)(request._id)
      .populate('artistId', 'fullName email')
      .populate('managerId', 'fullName email');

    return NextResponse.json(populatedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}