import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function POST(req: NextRequest) {
  try {
    // Validate user authentication
    const validateResponse = await fetch(`${req.nextUrl.origin}/api/auth/validate`, {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });

    if (!validateResponse.ok) {
      throw new Error('Unauthorized');
    }

    const { user } = await validateResponse.json();
    await connectDB();
    
    const applicationData = await req.json();
    
    const application = await Application.create({
      ...applicationData,
      applicant: user.id,
      status: 'pending'
    });

    // Update the job's applications array
    await Job.findByIdAndUpdate(
      applicationData.job,
      { $push: { applications: application._id } }
    );

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Application creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}