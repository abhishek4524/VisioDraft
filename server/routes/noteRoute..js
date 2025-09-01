import express from "express";
import {
  listNotes,
  addNote,
  removeNote,
  singleNote,
  viewNote
  
} from "../controllers/noteController.js";
import upload from "../middleware/multer.js";
import userAuth from "../middleware/userAuth.js";


const noteRouter = express.Router();

noteRouter.post(
  "/add", userAuth,
  upload.single("file"),
  addNote
);
noteRouter.post("/remove/:id", userAuth, removeNote);
noteRouter.post("/single", singleNote);
noteRouter.get("/list", listNotes);
noteRouter.get("/:id/view", viewNote);


export default noteRouter;
