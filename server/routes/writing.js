import express from "express";
import {
  postWriting,
  getWritingById,
  getAllWriting,
  addLikeToWriting,
  commentToWriting,
} from "../controllers/writing.js";

const router = express.Router();

router.post("/", postWriting);

router.post("/like", addLikeToWriting);

router.post("/comment", commentToWriting);

router.get("/:id", getWritingById);

router.get("/", getAllWriting);

export default router;
