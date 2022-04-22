import express from "express";
import {
  postWriting,
  getWritingById,
  getAllWriting,
  addLikeToWriting,
  commentToWriting,
} from "../controllers/writing.js";

import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken, postWriting);

router.post("/like", authenticateToken, addLikeToWriting);

router.post("/comment", authenticateToken, commentToWriting);

router.get("/:id", getWritingById);

router.get("/", getAllWriting);

export default router;
