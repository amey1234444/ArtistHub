import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Request from '@/models/Request';
import User from '@/models/User';
import { generateResponse } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    await connectDB();

    const user = await (User.findById as any)(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const requests = await (Request.find as any)({
      $or: [
        { artistId: user._id },
        { managerId: user._id }
      ]
    }).populate('artistId managerId');

    const userContext = `${user.fullName} is a ${user.role} on ArtistHub. They have ${requests.length} total requests, 
    with ${requests.filter(r => r.status === 'PENDING').length} pending and 
    ${requests.filter(r => r.status === 'ACCEPTED').length} accepted requests. 
    Recent activity: ${requests.slice(0, 3).map(r => `${r.eventName} (${r.status})`).join(', ')}. 
    Their question: ${message}`;

    const response = await generateResponse(userContext);

    console.log(response,"This is response in chat route");
    
    return NextResponse.json({ message: response });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { message: "I'm here to help with ArtistHub. How can I assist you?" },
      { status: 200 }
    );
  }
}