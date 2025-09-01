// routes/userRouter.js
import express from "express";
import {
  loginUser, 
  registerUser, 
  setupProfile, 
  adminLogin, 
  listUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyResetToken
} from "../controllers/userController.js";

import userAuth from "../middleware/userAuth.js"
import verifyAdmin from "../middleware/adminAuth.js"
import { getDbStats } from "../controllers/adminController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/setup-profile", userAuth, setupProfile);
userRouter.get("/list-users", listUsers);
userRouter.get("/user-profile", userAuth, getUser);
userRouter.put("/update-profile", userAuth, updateUser); // Changed to PUT for updating
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/db-stats", verifyAdmin, getDbStats);
userRouter.delete("/delete-user/:userId", verifyAdmin, deleteUser);
userRouter.post("/change-password", userAuth, changePassword);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/verify-reset-token", verifyResetToken);

export default userRouter;