import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';

export async function GET(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const validateResponse = await fetch(`${req.nextUrl.origin}/api/auth/validate`, {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });

    if (!validateResponse.ok) {
      return NextResponse.json({ hasApplied: false });
    }

    const { user } = await validateResponse.json();
    await connectDB();

    const application = await (Application.findOne as any)({
      job: params.jobId,
      applicant: user.id
    });

    return NextResponse.json({ hasApplied: !!application });
  } catch (error) {
    console.error('Error checking application status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}