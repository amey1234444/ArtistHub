import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const artists = await User.find({ role: 'artist' })
      .select('fullName email _id')
      .sort({ fullName: 1 });

    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}