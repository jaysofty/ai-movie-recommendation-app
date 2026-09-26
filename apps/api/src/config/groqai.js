import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is missing");
}

export const groq = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});