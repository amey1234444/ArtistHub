const axios = require("axios");
const readline = require("readline-sync");

const MODEL = "llama3:70b";
const API_URL = "http://localhost:11434/api/generate";

async function askOllama(question) {
  const response = await axios.post(API_URL, {
    model: MODEL,
    prompt: `You are a helpful chatbot. Answer the user: ${question}`,
    stream: false,
  });

  return response.data.response.trim();
}

async function chat() {
  console.log("💬 LLaMA 3 Chatbot (via Ollama)\nType 'exit' to quit.\n");
  while (true) {
    const userInput = readline.question("You: ");
    if (userInput.toLowerCase() === "exit") break;

    try {
      const reply = await askOllama(userInput);
      console.log("Bot:", reply);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

chat();
