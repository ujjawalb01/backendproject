import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

// Subscribe or Unsubscribe to a channel
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;

  if (channelId.toString() === userId.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const existingSub = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });

  if (existingSub) {
    await existingSub.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Unsubscribed successfully"));
  }

  const subscription = await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subscription, "Subscribed successfully"));
});

// Get all subscribers of a channel
const getChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const subscribers = await Subscription.find({ channel: channelId })
    .populate("subscriber", "fullName username avatar email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscribers fetched successfully"));
});

// Get all channels a user has subscribed to
const getUserSubscriptions = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const channels = await Subscription.find({ subscriber: userId })
    .populate("channel", "fullName username avatar email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, channels, "Subscribed channels fetched successfully"));
});

export { toggleSubscription, getChannelSubscribers, getUserSubscriptions };
