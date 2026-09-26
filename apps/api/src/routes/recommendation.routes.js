import { Router } from "express";
import { createRecommendation } from "../controllers/recommendation.controller.js";

const router = Router();

router.post("/", createRecommendation);

export default router;