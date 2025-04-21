const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/facebook/opt-1.3b";

interface Request {
  eventName: string;
  status: string;
  eventDate: string;
  amount: number;
}

interface User {
  _id: string;
  fullName: string;
  role: 'artist' | 'manager';
}

export const generateResponse = async (prompt: string) => {
  try {
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      },
      body: JSON.stringify({ 
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.8,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return Array.isArray(result) ? result[0].generated_text : result.generated_text;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I apologize, but I'm having trouble right now. Could you please try asking your question again?";
  }
};

export const createPrompt = (user: User, requests: Request[], message: string) => {
  const pendingRequests = requests.filter(r => r.status === 'PENDING');
  const acceptedRequests = requests.filter(r => r.status === 'ACCEPTED');
  
  const getRequestDetails = (request: Request) => {
    const date = new Date(request.eventDate).toLocaleDateString();
    const amount = request.amount ? `₹${request.amount}` : 'Amount not specified';
    return `${request.eventName} (${request.status}) on ${date} for ${amount}`;
  };

  const recentActivity = requests.slice(0, 3).map(getRequestDetails).join('\n');
  const totalEarnings = acceptedRequests.reduce((sum, r) => sum + (r.amount || 0), 0);

  const roleSpecificInfo = user.role === 'artist' ? `
As an artist on ArtistHub:
- You have ${pendingRequests.length} requests waiting for your response
- ${acceptedRequests.length} upcoming performances
- Total earnings: ₹${totalEarnings}
- You can manage your bookings and payment details here

Key features for you:
1. Review new booking requests
2. Update your UPI payment information
3. Track your performance schedule
4. Monitor your earnings
` : `
As an event manager on ArtistHub:
- ${pendingRequests.length} pending artist responses
- ${acceptedRequests.length} confirmed events
- Total booking value: ₹${totalEarnings}
- You can manage all your event bookings here

Key features for you:
1. Send new booking requests
2. Process payments for confirmed events
3. Track event schedules
4. Manage multiple artist bookings
`;

  const context = `
System: You are the ArtistHub AI Assistant. Be helpful, friendly, and professional.

User: ${user.fullName} (${user.role})

Current Status:
${roleSpecificInfo}

Recent Activity:
${recentActivity}

User Question: "${message}"

Response Guidelines:
- Address ${user.fullName} personally
- Provide specific information based on their role and status
- Reference recent activities when relevant
- Include specific numbers and amounts when discussing bookings or payments
- Suggest next steps based on their question
- Keep the tone friendly and professional
`;

  return context;
};