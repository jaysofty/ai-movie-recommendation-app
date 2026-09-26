import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is missing");
}

const groq = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

const response = await groq.models.list();

for (const model of response.data) {
  console.log(model.id);
}