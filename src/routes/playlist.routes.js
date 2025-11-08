import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

// create new playlist
router.route("/").post(verifyJWT, createPlaylist);

// get all playlists of logged-in user
router.route("/").get(verifyJWT, getUserPlaylists);

// get a single playlist by ID
router.route("/:playlistId").get(verifyJWT, getPlaylistById);

// add a video to playlist
router.route("/:playlistId/:videoId").post(verifyJWT, addVideoToPlaylist);

// remove a video from playlist
router.route("/:playlistId/:videoId").delete(verifyJWT, removeVideoFromPlaylist);

// delete a playlist
router.route("/:playlistId").delete(verifyJWT, deletePlaylist);

export default router;
