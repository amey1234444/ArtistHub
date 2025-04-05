import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Rating from '@/models/Rating';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectDB();
    const rating = await Rating.create(data);
    return NextResponse.json(rating);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const artistId = req.nextUrl.searchParams.get('artistId');
    await connectDB();
    const ratings = await Rating.find({ artist: artistId })
      .populate('manager', 'fullName')
      .populate('job', 'title')
      .sort({ createdAt: -1 });
    
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    
    return NextResponse.json({
      ratings,
      averageRating: isNaN(averageRating) ? 0 : averageRating
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}