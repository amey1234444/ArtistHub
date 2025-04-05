import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Request from '@/models/Request';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    if (!decoded || !decoded.userId || decoded.role !== 'artist') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const request = await Request.findOneAndUpdate(
      { _id: params.id, artistId: decoded.userId },
      { status: data.status },
      { new: true }
    ).populate('artistId managerId');

    if (!request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json(request);
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}