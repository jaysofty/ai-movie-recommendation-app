export function buildRecommendationQuery(preferences) {
  const { favoriteMovie, movieStyle, mood } = preferences;

  const parts = ["Find a movie matching the following viewing preferences."];

  if (movieStyle) {
    parts.push(
      `Preferred genre, style, themes, and atmosphere: ${movieStyle}.`,
    );
  }

  if (mood) {
    parts.push(`Desired emotional tone and mood: ${mood}.`);
  }

  if (favoriteMovie) {
    parts.push(
      `The viewer likes ${favoriteMovie} and wants a movie with a similar tone, themes, genre, atmosphere, or emotional experience.`,
    );
  }

  parts.push(
    "Prioritize similarity in genre, themes, tone, atmosphere, and emotional experience.",
  );

  return parts.join("\n");
}
