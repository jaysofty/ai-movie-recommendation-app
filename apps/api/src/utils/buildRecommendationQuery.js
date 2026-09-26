export function buildRecommendationQuery(preferences) {
  const {
    numberOfPeople,
    duration,
    favoriteMovie,
    movieStyle,
    mood,
    strandedPerson,
  } = preferences;

  return `
I am choosing a movie for ${numberOfPeople || "a group of people"}.

Available viewing time: ${duration || "flexible"}.

A movie I already like is:
${favoriteMovie || "No specific favorite movie provided"}.

Preferred movie style:
${movieStyle || "Any style"}.

Desired mood:
${mood || "Any mood"}.

The movie should be suitable for:
${strandedPerson || "a general audience"}.

Find movies that are similar in themes, tone, genre,
emotional experience, and overall viewing preference.
  `.trim();
}