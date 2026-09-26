import "dotenv/config";

import { supabase } from "../config/supabase.js";
import { createEmbedding } from "../services/embedding.service.js";

const query = `
I want an inspiring classic movie about hope,
perseverance, and overcoming difficult circumstances.
I have about 2 hours available.
`;

console.log("Creating query embedding...");

const embedding = await createEmbedding(query);

console.log(`Query embedding dimensions: ${embedding.length}`);

const { data, error } = await supabase.rpc("match_movies", {
  query_embedding: embedding,
  match_count: 5,
});

if (error) {
  console.error("Similarity search failed:", error);
  process.exit(1);
}

console.log("\nSemantic search results:\n");

for (const movie of data) {
  console.log({
    title: movie.title,
    year: movie.year,
    similarity: movie.similarity,
  });
}