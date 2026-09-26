import "dotenv/config";

import { generateRecommendation } from "../services/recommendation.service.js";

const preferences = {
  numberOfPeople: 2,
  duration: "2 hours",
  favoriteMovie: "The Shawshank Redemption",
  movieStyle: "Classic",
  mood: "Inspiring",
  strandedPerson: "Someone who needs hope and motivation",
};

console.log("Starting PopChoice RAG pipeline...\n");

const result = await generateRecommendation(preferences);

console.log("\nFinal recommendation:\n");

console.log(JSON.stringify(result, null, 2));