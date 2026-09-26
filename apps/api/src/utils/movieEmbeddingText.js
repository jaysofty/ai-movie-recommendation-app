export function buildMovieEmbeddingText(movie) {
  return [
    `Title: ${movie.title}`,
    `Year: ${movie.year ?? "Unknown"}`,
    `Description: ${movie.description ?? ""}`,
    `Genres: ${(movie.genres ?? []).join(", ")}`,
    `Runtime: ${movie.runtime_minutes ?? "Unknown"} minutes`,
    `Rating: ${movie.rating ?? "Unknown"}`,
  ].join("\n");
}