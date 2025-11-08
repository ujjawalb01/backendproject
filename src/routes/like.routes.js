import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleVideoLike,
  toggleCommentLike,
  getLikedVideos,
} from "../controllers/like.controller.js";

const router = express.Router();

// like or unlike a video
router.route("/video/:videoId").post(verifyJWT, toggleVideoLike);

// like or unlike a comment
router.route("/comment/:commentId").post(verifyJWT, toggleCommentLike);

// get all liked videos by logged-in user
router.route("/videos").get(verifyJWT, getLikedVideos);

export default router;
