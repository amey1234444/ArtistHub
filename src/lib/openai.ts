import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponse = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly ArtistHub assistant helping users manage their bookings and events. Respond naturally and conversationally, addressing users by name. Focus on being helpful while maintaining a warm, professional tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 150,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm here to help with your ArtistHub needs. What would you like to know?";
  }
};

export const createChatPrompt = (user: any, requests: any[], message: string) => {
  const userContext = {
    role: user.role,
    name: user.fullName,
    pendingRequests: requests.filter(r => r.status === 'PENDING').length,
    acceptedRequests: requests.filter(r => r.status === 'ACCEPTED').length,
    totalRequests: requests.length
  };

  return [
    {
      role: "system",
      content: `You are an AI assistant for ArtistHub, a platform connecting artists with event managers. 
      Current user is a ${userContext.role} named ${userContext.name}.
      They have ${userContext.totalRequests} total requests, ${userContext.pendingRequests} pending, and ${userContext.acceptedRequests} accepted.
      Provide helpful, concise responses about their requests, payments, and platform usage.
      For artists: Focus on managing requests, updating UPI details, and accepting/rejecting offers.
      For managers: Focus on sending requests, payment processes, and finding artists.
      Keep responses friendly and under 100 words.`
    },
    {
      role: "user",
      content: message
    }
  ];
};