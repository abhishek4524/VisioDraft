import express from "express";
import {
    createCommunity,
    subscribeToCommunity,
    unsubscribeFromCommunity,
    viewCommunity,
    listCommunities
} from "../controllers/communityController.js";

import userAuth from "../middleware/userAuth.js";

const communityRouter = express.Router();

communityRouter.post("/create", userAuth, createCommunity);
communityRouter.post("/subscribe", userAuth, subscribeToCommunity);
communityRouter.post("/unsubscribe", userAuth, unsubscribeFromCommunity);
communityRouter.get("/view/:id", userAuth, viewCommunity);
communityRouter.get("/list", userAuth, listCommunities);

export default communityRouter;