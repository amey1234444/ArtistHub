import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function GET(req: NextRequest) {
  try {
    const validateResponse = await fetch(`${req.nextUrl.origin}/api/auth/validate`, {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    });

    if (!validateResponse.ok) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { user } = await validateResponse.json();
    await connectDB();

    const jobs = await (Job.find as any)({ manager: user.id });
    const applications = await (Application.find as any)({ job: { $in: jobs.map(job => job._id) } })
      .populate('job')
      .populate('applicant', 'fullName email portfolio')
      .sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}