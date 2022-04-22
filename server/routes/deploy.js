import express from "express";

import { deploy } from "../controllers/deploy.js";

const router = express.Router();

// deploy contracts
router.post("/", deploy);

export default router;
