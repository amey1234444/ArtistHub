import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateResponse = async (prompt: string) => {
  try {
    const completion = await groq.chat.completions.create({
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
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 150,
      top_p: 0.9,
      stream: false
    });

    return completion.choices[0]?.message?.content || "How can I help you with ArtistHub today?";
  } catch (error) {
    console.error("Groq API error:", error);
    if (error.status === 404) {
      return "I'm currently experiencing technical difficulties. Please try again in a moment.";
    }
    return "I'm here to help with your ArtistHub needs. What would you like to know?";
  }
};