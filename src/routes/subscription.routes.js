import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  toggleSubscription,
  getChannelSubscribers,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const router = express.Router();

// subscribe or unsubscribe a channel
router.route("/toggle/:channelId").post(verifyJWT, toggleSubscription);

// get all subscribers for a specific channel
router.route("/channel/:channelId").get(getChannelSubscribers);

// get all channels subscribed by the logged-in user
router.route("/user/subscriptions").get(verifyJWT, getUserSubscriptions);

export default router;
