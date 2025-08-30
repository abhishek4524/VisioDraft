import express from "express";
import {
    loginUser, registerUser, setupProfile, adminLogin, listUsers, getUser , updateUser, deleteUser
} from "../controllers/userController.js";

import userAuth from "../middleware/userAuth.js"
import verifyAdmin from "../middleware/adminAuth.js"
import { getDbStats } from "../controllers/adminController.js";
 
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/setup-profile", setupProfile);
userRouter.get("/list-users", listUsers);
userRouter.get("/user-profile",userAuth, getUser);
userRouter.post("/edit-profile",userAuth, updateUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/db-stats", verifyAdmin, getDbStats);

export default userRouter;
