import "dotenv/config";

import { findMovieCandidates } from "../services/recommendation.service.js";

const preferences = {
  numberOfPeople: 2,
  duration: "2 hours",
  favoriteMovie: "The Shawshank Redemption",
  movieStyle: "Classic",
  mood: "Inspiring",
  strandedPerson: "Someone who needs hope and motivation",
};

const movies = await findMovieCandidates(preferences);

console.log("\nRecommended candidates:\n");

for (const movie of movies) {
  console.log({
    title: movie.title,
    year: movie.year,
    similarity: movie.similarity,
    genres: movie.genres,
    runtimeMinutes: movie.runtimeMinutes,
  });
}