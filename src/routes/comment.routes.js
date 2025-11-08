import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  getVideoComments,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// add a new comment on a video
router.route("/:videoId").post(verifyJWT, addComment);

// get all comments for a video
router.route("/:videoId").get(getVideoComments);

// delete a specific comment
router.route("/:commentId").delete(verifyJWT, deleteComment);

export default router;
