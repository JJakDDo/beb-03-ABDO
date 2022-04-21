import Web3 from "web3";

export const web3 = new Web3(
  // new Web3.providers.HttpProvider(
  //   "https://rinkeby.infura.io/v3/0de3b94811a7482594d0a137397d3755"
  // )
  new Web3.providers.HttpProvider("http://127.0.0.1:7545")
);
