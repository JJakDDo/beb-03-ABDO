import Web3 from "web3";
import dotenv from 'dotenv';

dotenv.config();

export const web3 = new Web3(process.env.NODE_URI || "http://127.0.0.1:7545");
  // new Web3.providers.HttpProvider(
  //   "https://rinkeby.infura.io/v3/0de3b94811a7482594d0a137397d3755"
