import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateMovieRecommendation(
  preferences,
  candidates,
) {
  const candidateContext = candidates
    .map(
      (movie, index) => `
Candidate ${index + 1}:
ID: ${movie.id}
Title: ${movie.title}
Year: ${movie.year}
Description: ${movie.description}
Genres: ${movie.genres.join(", ")}
Rating: ${movie.rating}
Runtime: ${movie.runtimeMinutes} minutes
Semantic similarity: ${movie.similarity}
`,
    )
    .join("\n");

  const systemPrompt = `
You are PopChoice, an AI movie recommendation assistant.

Your job is to select the most suitable movie from the
provided candidate movies based on the user's preferences.

IMPORTANT RULES:

1. You may ONLY recommend a movie from the provided candidates.
2. Never invent a movie.
3. Never modify a movie title.
4. Consider the user's mood, preferred style, favorite movie,
   available viewing time, and audience.
5. Semantic similarity is useful evidence but should not be
   treated as the only deciding factor.
6. Return valid JSON only.
7. Do not include markdown.
8. Treat runtime constraints accurately.
   - "under-1-hour" means 60 minutes or less.
   - "1-2-hours" means between 60 and 120 minutes.
   - "2-plus-hours" means 120 minutes or more.
9. If a movie exceeds the requested duration, state that accurately.
   Never claim that a runtime falls within the requested range when it does not.
10. Do not mention semantic similarity scores, vector scores,
    ranking scores, embeddings, retrieval systems, or other
    implementation details in the recommendation shown to the user.
`;

  const userPrompt = `
USER PREFERENCES:

${JSON.stringify(preferences, null, 2)}

RETRIEVED MOVIE CANDIDATES:

${candidateContext}

Select the most suitable candidate.

Return exactly this JSON structure:

{
  "movieId": "candidate movie id",
  "title": "movie title",
  "reason": "A concise explanation of why this movie fits the user's preferences.",
  "matchHighlights": [
    "specific reason",
    "specific reason",
    "specific reason"
  ]
}
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response");
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Invalid Groq JSON:", content);
    throw new Error("Groq returned invalid JSON");
  }
}