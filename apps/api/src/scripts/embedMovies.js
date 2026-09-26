import "dotenv/config";

import { supabase } from "../config/supabase.js";
import { createEmbedding } from "../services/embedding.service.js";
import { buildMovieEmbeddingText } from "../utils/movieEmbeddingText.js";

const { data: movies, error } = await supabase
  .from("movies")
  .select("*");

if (error) {
  throw error;
}

console.log(`Found ${movies.length} movies.`);

for (const movie of movies) {
  console.log(`Embedding: ${movie.title}`);

  const text = buildMovieEmbeddingText(movie);

  const embedding = await createEmbedding(text);

  console.log(`Vector dimensions: ${embedding.length}`);

  const { error: updateError } = await supabase
    .from("movies")
    .update({
      embedding,
    })
    .eq("id", movie.id);

  if (updateError) {
    throw updateError;
  }

  console.log(`✓ Saved embedding for ${movie.title}`);
}

console.log("All movie embeddings generated.");