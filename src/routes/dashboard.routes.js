import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// get dashboard statistics for the logged-in user
router.route("/stats").get(verifyJWT, getChannelStats);

// get all videos uploaded by the logged-in user
router.route("/videos").get(verifyJWT, getChannelVideos);

export default router;
