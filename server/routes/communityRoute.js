import express from "express";
import {
    createCommunity,
    subscribeToCommunity,
    unsubscribeFromCommunity,
    getCommunityStats,
    listCommunities,
    viewCommunity
} from "../controllers/communityController.js";

import userAuth from "../middleware/userAuth.js";

const communityRouter = express.Router();

communityRouter.post("/create", userAuth, createCommunity);
communityRouter.post("/subscribe", userAuth, subscribeToCommunity);
communityRouter.post("/unsubscribe", userAuth, unsubscribeFromCommunity);
communityRouter.get("/view/:id", userAuth, viewCommunity);  // full details
communityRouter.get("/stats/:id", userAuth, getCommunityStats); // just stats
communityRouter.get("/list", listCommunities);

export default communityRouter;