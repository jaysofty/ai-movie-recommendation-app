import { supabase } from "../config/supabase.js";
import { createEmbedding } from "./embedding.service.js";
import { buildRecommendationQuery } from "../utils/buildRecommendationQuery.js";
import { generateMovieRecommendation } from "./groq.service.js";

function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    description: movie.description,
    genres: movie.genres,
    rating: movie.rating,
    posterUrl: movie.poster_url,
    runtimeMinutes: movie.runtime_minutes,
    similarity: movie.similarity,
  };
}

async function findMovieCandidates(preferences) {
  const query = buildRecommendationQuery(preferences);

  console.log("\nSemantic recommendation query:");
  console.log(query);

  const embedding = await createEmbedding(query);

  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_count: 5,
  });
  console.log("\nRAW RPC RESULTS:");

  console.dir(data, { depth: null });

  if (error) {
    console.error("Movie similarity search failed:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("No matching movies found");
  }

  return data.map(formatMovie);
}

export async function generateRecommendation(preferences) {
  const candidates = await findMovieCandidates(preferences);

  console.log("\nRetrieved candidates:");

  for (const movie of candidates) {
    console.log(`${movie.title} — similarity: ${movie.similarity}`);
  }

  const recommendation = await generateMovieRecommendation(
    preferences,
    candidates,
  );

  const selectedMovie = candidates.find(
    (movie) => movie.id === recommendation.movieId,
  );

  console.log("\n========== GROQ RESPONSE ==========");
console.dir(recommendation, { depth: null });

console.log("\n========== SELECTED MOVIE ==========");
console.dir(selectedMovie, { depth: null });

  if (!selectedMovie) {
    throw new Error(
      "Groq selected a movie that was not in the retrieved candidates",
    );
  }

  console.log("\n========== FINAL RESPONSE ==========");
console.dir(
  {
    movie: selectedMovie,
    reason: recommendation.reason,
    matchHighlights: recommendation.matchHighlights,
  },
  { depth: null },
);

  return {
    movie: selectedMovie,
    reason: recommendation.reason,
    matchHighlights: recommendation.matchHighlights,
  };
}
