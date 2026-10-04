import { supabase } from "../config/supabase.js";
import { createEmbedding } from "./embedding.service.js";
import { buildRecommendationQuery } from "../utils/buildRecommendationQuery.js";
import { generateMovieRecommendation } from "./groq.service.js";
import { getMoviePoster } from "./tmdb.service.js";


function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    description: movie.description,
    genres: movie.genres || [],
    rating: Number(movie.rating) || 0,
    posterUrl: movie.poster_url,
    runtimeMinutes: movie.runtime_minutes,
    similarity: Number(movie.similarity) || 0,
  };
}

/**
 * Normalize text so comparisons are more reliable.
 */
function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function normalizeMovieTitle(title = "") {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function excludeFavoriteMovie(candidates, favoriteMovie) {
  if (!favoriteMovie) return candidates;

  const normalizedFavorite = normalizeMovieTitle(favoriteMovie);

  const filtered = candidates.filter((movie) => {
    return normalizeMovieTitle(movie.title) !== normalizedFavorite;
  });

  console.log(
    `Excluded favorite movie "${favoriteMovie}". ` +
      `${candidates.length} → ${filtered.length} candidates.`,
  );

  return filtered;
}

/**
 * Common movie-style keywords that can be extracted from
 * the user's free-text movieStyle answer.
 *
 * These are ranking hints, not hard filters.
 */
const STYLE_KEYWORDS = [
  "action",
  "adventure",
  "animation",
  "biography",
  "comedy",
  "crime",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "mystery",
  "musical",
  "romance",
  "romantic",
  "sci-fi",
  "science fiction",
  "sport",
  "thriller",
  "war",
  "western",
];

/**
 * Convert related style terms into the same canonical value.
 */
function normalizeStyleKeyword(keyword) {
  const aliases = {
    romantic: "romance",
    "science fiction": "sci-fi",
  };

  return aliases[keyword] || keyword;
}

/**
 * Extract genre/style words explicitly mentioned by the user.
 *
 * Example:
 * "Dark supernatural horror mystery"
 *
 * becomes:
 * ["horror", "mystery"]
 */
function extractPreferredStyles(preferences) {
  const movieStyle = normalizeText(preferences.movieStyle);

  return [
    ...new Set(
      STYLE_KEYWORDS.filter((keyword) => movieStyle.includes(keyword)).map(
        normalizeStyleKeyword,
      ),
    ),
  ];
}

/**
 * Normalize movie genres so old values such as
 * "Science Fiction" match newer "Sci-Fi" values.
 */
function normalizeGenres(genres = []) {
  return genres.map((genre) => {
    const normalized = normalizeText(genre);

    if (normalized === "science fiction") {
      return "sci-fi";
    }

    return normalized;
  });
}

/**
 * Genre/style compatibility score.
 *
 * 1   = all explicitly requested styles match
 * 0.5 = some match
 * 0   = none match / no explicit genre was detected
 */
function getGenreScore(movie, preferences) {
  const preferredStyles = extractPreferredStyles(preferences);

  if (preferredStyles.length === 0) {
    return 0;
  }

  const movieGenres = normalizeGenres(movie.genres);

  const matches = preferredStyles.filter((style) =>
    movieGenres.includes(style),
  );

  if (matches.length === 0) {
    return 0;
  }

  return matches.length / preferredStyles.length;
}

/**
 * Duration compatibility.
 *
 * We use a small tolerance rather than immediately rejecting
 * otherwise excellent recommendations.
 */
function getDurationScore(duration, runtimeMinutes) {
  if (!runtimeMinutes) {
    return 0;
  }

  switch (duration) {
    case "under-1-hour":
      if (runtimeMinutes <= 60) return 1;
      if (runtimeMinutes <= 75) return 0.5;
      return 0;

    case "1-2-hours":
      if (runtimeMinutes >= 60 && runtimeMinutes <= 120) {
        return 1;
      }

      if (runtimeMinutes > 120 && runtimeMinutes <= 135) {
        return 0.5;
      }

      return 0;

    case "2-plus-hours":
      if (runtimeMinutes >= 120) return 1;
      if (runtimeMinutes >= 105) return 0.5;
      return 0;

    default:
      return 0.5;
  }
}

/**
 * Convert movie rating into a 0-1 score.
 *
 * Example:
 * 8.5 -> 0.85
 */
function getRatingScore(rating) {
  const numericRating = Number(rating);

  if (!Number.isFinite(numericRating)) {
    return 0;
  }

  return Math.min(Math.max(numericRating / 10, 0), 1);
}

/**
 * Hybrid ranking.
 *
 * Semantic similarity remains the strongest signal, but
 * genre/style and duration can correct weak vector rankings.
 */
function rerankCandidates(candidates, preferences) {
  return candidates
    .map((movie) => {
      const semanticScore = movie.similarity;

      const genreScore = getGenreScore(movie, preferences);

      const durationScore = getDurationScore(
        preferences.duration,
        movie.runtimeMinutes,
      );

      const ratingScore = getRatingScore(movie.rating);

      const rankingScore =
        semanticScore * 0.5 +
        genreScore * 0.25 +
        durationScore * 0.2 +
        ratingScore * 0.05;

      return {
        ...movie,

        ranking: {
          semanticScore,
          genreScore,
          durationScore,
          ratingScore,
          finalScore: rankingScore,
        },
      };
    })
    .sort((a, b) => b.ranking.finalScore - a.ranking.finalScore);
}

async function findMovieCandidates(preferences) {
  const query = buildRecommendationQuery(preferences);

  console.log("\n========== SEMANTIC QUERY ==========");
  console.log(query);

  // Generate the semantic embedding from the user's preferences.
  const embedding = await createEmbedding(query);

  if (!Array.isArray(embedding) || embedding.length !== 384) {
    throw new Error(
      `Invalid query embedding. Expected 384 dimensions, received ${embedding?.length}.`,
    );
  }

  if (!embedding.every((value) => Number.isFinite(value))) {
    throw new Error("Query embedding contains non-finite values.");
  }

  // Convert the JS array to pgvector's text representation.
  const queryVector = `[${embedding.join(",")}]`;

  // Retrieve the 15 closest semantic matches.
  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: queryVector,
    match_count: 15,
  });

  if (error) {
    console.error("Movie similarity search failed:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("No matching movies found");
  }

  console.log("\n========== SEMANTIC RESULTS ==========");

  for (const movie of data) {
    console.log({
      title: movie.title,
      similarity: Number(movie.similarity).toFixed(4),
    });
  }

  // Convert DB rows to application movie objects.
  // Convert DB rows to application movie objects.
  const semanticCandidates = data.map(formatMovie);

  // Apply deterministic genre, duration and rating signals.
  const rankedCandidates = rerankCandidates(semanticCandidates, preferences);

  // The favorite movie is used as a taste reference during semantic
  // retrieval, but it should not be eligible for recommendation.
  const eligibleCandidates = excludeFavoriteMovie(
    rankedCandidates,
    preferences.favoriteMovie,
  );

  if (eligibleCandidates.length === 0) {
    throw new Error("No alternative movie recommendations were found.");
  }

  console.log("\n========== HYBRID RANKING ==========");

  for (const movie of eligibleCandidates) {
    console.log({
      title: movie.title,
      semantic: movie.ranking.semanticScore.toFixed(4),
      genre: movie.ranking.genreScore.toFixed(2),
      duration: movie.ranking.durationScore.toFixed(2),
      rating: movie.ranking.ratingScore.toFixed(2),
      final: movie.ranking.finalScore.toFixed(4),
    });
  }

  // Groq only receives eligible alternatives.
  // The user's exact favorite movie can no longer be selected.
  return eligibleCandidates.slice(0, 5);
}


async function resolveMoviePoster(movie) {
  // Already cached in Supabase.
  if (movie.posterUrl) {
    console.log(`Using cached poster for ${movie.title}`);

    return movie.posterUrl.replace(/^\[(.*?)\]\((.*?)\)$/, "$2");
  }

  try {
    console.log(`No cached poster for ${movie.title}. Searching TMDB...`);

    const posterUrl = await getMoviePoster(movie.title, movie.year);

    if (!posterUrl) {
      console.log(`No TMDB poster found for ${movie.title}`);

      return null;
    }

    console.log(`TMDB poster found for ${movie.title}:`, posterUrl);

    // Cache it so future requests don't need TMDB.
    const { error } = await supabase
      .from("movies")
      .update({
        poster_url: posterUrl,
      })
      .eq("id", movie.id);

    if (error) {
      // Don't fail the recommendation just because caching failed.
      console.error(`Failed to cache poster for ${movie.title}:`, error);
    } else {
      console.log(`Poster cached successfully for ${movie.title}`);
    }

    return posterUrl;
  } catch (error) {
    // Poster failure should never break movie recommendation.
    console.error(`Poster lookup failed for ${movie.title}:`, error);

    return null;
  }
}

export async function generateRecommendation(preferences) {
  const candidates = await findMovieCandidates(preferences);

  console.log("\n========== TOP 5 AFTER HYBRID RANKING ==========");

  console.log(JSON.stringify(candidates, null, 2));

  const recommendation = await generateMovieRecommendation(
    preferences,
    candidates,
  );

  console.log("\n========== GROQ RESPONSE ==========");

  console.log(recommendation);

  const selectedMovie = candidates.find(
    (movie) => movie.id === recommendation.movieId,
  );

  console.log("\n========== SELECTED MOVIE ==========");

  console.log(selectedMovie);

  if (!selectedMovie) {
    throw new Error(
      "Groq selected a movie that was not in the retrieved candidates",
    );
  }

  // Resolve existing poster or retrieve/cache one from TMDB.
  const posterUrl = await resolveMoviePoster(selectedMovie);

  const finalMovie = {
    id: selectedMovie.id,
    title: selectedMovie.title,
    year: selectedMovie.year,
    description: selectedMovie.description,
    genres: selectedMovie.genres,
    rating: selectedMovie.rating,
    posterUrl,
    runtimeMinutes: selectedMovie.runtimeMinutes,
    similarity: selectedMovie.similarity,
  };

  const finalResponse = {
    movie: finalMovie,
    reason: recommendation.reason,
    matchHighlights: recommendation.matchHighlights,
  };

  console.log("\n========== FINAL RESPONSE ==========");

  console.log(finalResponse);

  return finalResponse;
}
