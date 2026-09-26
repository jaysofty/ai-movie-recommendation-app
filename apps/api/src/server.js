import "dotenv/config";
import express from "express";
import cors from "cors";

import recommendationRoutes from "./routes/recommendation.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PopChoice API is running",
  });
});

app.use("/api/recommendations", recommendationRoutes);

app.listen(PORT, () => {
  console.log(`PopChoice API running on http://localhost:${PORT}`);
});