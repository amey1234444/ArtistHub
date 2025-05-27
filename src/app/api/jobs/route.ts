import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';
import Application from '@/models/Application';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify JWT token
const verifyToken = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }
  return verify(token, JWT_SECRET) as { userId: string, role: string };
};

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    if (decoded.role !== 'manager') {
      return NextResponse.json(
        { error: 'Only managers can post jobs' },
        { status: 403 }
      );
    }

    await connectDB();
    const jobData = await req.json();

    // Validate required fields based on schema
    const requiredFields = [
      'title',
      'description',
      'requirements',
      'location',
      'type',
      'salary'
    ];
    const missingFields = requiredFields.filter(field => !jobData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const job = await (Job.create as any)({
      ...jobData,
      manager: decoded.userId,
      status: 'open',
      applications: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("Inside Job api route and job is posted successfully and the job is",job);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
     const jobs = await (Job.find as any)({ status: 'open' })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('manager', 'fullName email');
    // Removed the applications populate since we might not need it for listing

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}