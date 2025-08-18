import express from "express";
import {
loginUser, registerUser, setupProfile, adminLogin, listUsers, getUser , updateUser, deleteUser
} from "../controllers/userController.js";

import userAuth from "../middleware/userAuth.js"
 
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/setup-profile", setupProfile);
userRouter.post("/list-users", listUsers);
userRouter.get("/user-profile",userAuth, getUser);
userRouter.post("/edit-profile",userAuth, updateUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
