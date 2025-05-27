import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    await connectDB();
    
    const application = await Application.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).exec(); // Add .exec() to properly handle the mongoose promise

    if (!application) {
      return Response.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return Response.json(application);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error updating application status" },
      { status: 500 }
    );
  }
}