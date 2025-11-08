import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  publishVideo,
  getAllVideos,
  getVideoById,
  updateVideoDetails,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// upload new video
router
  .route("/upload-video")
  .post(
    verifyJWT,
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    publishVideo
  );

// get all published videos
router.route("/allvideos").get(getAllVideos);

// get, update, delete video by id
router
  .route("/:videoId")
  .get(getVideoById)
  .put(verifyJWT, updateVideoDetails)
  .delete(verifyJWT, deleteVideo);

// toggle publish status
router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;
