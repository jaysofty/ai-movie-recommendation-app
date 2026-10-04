import { generateRecommendation } from "../services/recommendation.service.js";

export async function createRecommendation(req, res) {
  try {
    const preferences = req.body;

    if (!preferences || typeof preferences !== "object") {
      return res.status(400).json({
        success: false,
        message: "Preferences are required",
      });
    }

    const recommendation = await generateRecommendation(preferences);

    // console.log("========== CONTROLLER RESPONSE ==========");
    // console.log(JSON.stringify(recommendation, null, 2));

    // console.log(
    //   "POSTER URL BEFORE EXPRESS:",
    //   recommendation.movie?.posterUrl,
    // );

    return res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate recommendation",
    });
  }
}