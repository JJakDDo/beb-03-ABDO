import "express-async-errors";
// Import packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import accountRoutes from "./routes/account.js";
import writingRoutes from "./routes/writing.js";
import nftRoutes from "./routes/nft.js";
import deployRoutes from "./routes/deploy.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { abi, bytecode } from "./contract.js";

import {
  createServerAccount,
  deployContracts,
  getFaucet,
} from "./initSetting.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ extende: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);
app.use("/writing", writingRoutes);
app.use("/nft", nftRoutes);
app.use("/deploy", deployRoutes);

app.use(notFound);
app.use(errorHandler);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}...`);
      await createServerAccount();
      await getFaucet(10);
      // ERC20 컨트랙트 배포
      await deployContracts("FT", abi, bytecode);
      // ERC721 컨트랙트 배포
      //await deployContracts("NFT");
      //setToken(nftAbi);
    })
  )
  .catch((err) => console.log(err.message));
