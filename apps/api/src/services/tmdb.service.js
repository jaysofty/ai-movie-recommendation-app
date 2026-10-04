const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function getAccessToken() {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is not configured");
  }

  return token;
}

async function tmdbRequest(path, params = {}) {
  const url = new URL(`${TMDB_API_URL}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `TMDB request failed with HTTP ${response.status}: ${body}`,
    );
  }

  return response.json();
}

export async function findMovieOnTMDB(title, year) {
  const data = await tmdbRequest("/search/movie", {
    query: title,
    year,
    language: "en-US",
    include_adult: false,
  });

  if (!data.results?.length) {
    return null;
  }

  const movie = data.results[0];

  return {
    tmdbId: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    posterUrl: movie.poster_path
      ? `${TMDB_IMAGE_URL}${movie.poster_path}`
      : null,
  };
}

export async function getMoviePoster(title, year) {
  const movie = await findMovieOnTMDB(title, year);

  return movie?.posterUrl ?? null;
}
