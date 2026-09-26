const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getRecommendation(preferences) {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to get recommendation",
    );
  }

  return data.data;
}