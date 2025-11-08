import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const totalVideos = await Video.countDocuments({ owner: userId });
  const totalComments = await Comment.countDocuments({ owner: userId });

  const totalViewsAgg = await Video.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);

  const totalViews = totalViewsAgg.length > 0 ? totalViewsAgg[0].totalViews : 0;

  const stats = {
    totalVideos,
    totalComments,
    totalViews,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Dashboard statistics fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
