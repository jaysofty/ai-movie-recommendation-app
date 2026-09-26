import "dotenv/config";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const response = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",

  messages: [
    {
      role: "system",
      content:
        "You are PopChoice, a movie recommendation assistant. Recommend movies based only on the user's preferences.",
    },
    {
      role: "user",
      content:
        "I love inspiring classic movies about hope and perseverance. I have about 2 hours available.",
    },
  ],
});

console.log(response.choices[0].message.content);