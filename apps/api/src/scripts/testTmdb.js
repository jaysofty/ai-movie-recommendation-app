import "dotenv/config";
import { findMovieOnTMDB } from "../services/tmdb.service.js";

async function testTMDB() {
  try {
    console.log("Testing TMDB connection...");

    const movie = await findMovieOnTMDB("Get Out", 2017);

    console.log("\n========== TMDB RESULT ==========");
    console.log(movie);

    if (!movie) {
      throw new Error("Get Out was not found on TMDB");
    }

    if (!movie.posterUrl) {
      throw new Error("TMDB movie does not contain a poster");
    }

    console.log("\nTMDB integration working.");
    console.log("Poster:", movie.posterUrl);
  } catch (error) {
    console.error("\nTMDB test failed:");
    console.error(error);

    process.exitCode = 1;
  }
}

testTMDB();
