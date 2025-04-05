import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    await connectDB();
    
    const application = await Application.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate('job applicant');

    return NextResponse.json(application);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}