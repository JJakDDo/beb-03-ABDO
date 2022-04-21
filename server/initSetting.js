import { web3 } from "./web3.js";
import Account from "./models/account.js";
import Contract from "./models/contract.js";
import { abi, bytecode } from "./contract.js";

export const createServerAccount = async () => {
  const data = await Account.findOne({ userId: "admin" });
  if (data === null) {
    const { address, privateKey } = web3.eth.accounts.create();
    console.log("Server wallet is created!");
    console.log(`Address: ${address}`);
    console.log(`PrivateKey: ${privateKey}`);
    const newAccount = new Account({
      userId: "admin",
      password: "admin",
      nickname: "admin",
      address: address,
      privateKey: privateKey,
      token: 0,
      nft: [],
    });
    try {
      await newAccount.save();
    } catch (err) {
      console.log(err);
    }
    return;
  }
  console.log("Server account is already existed!");
  console.log(`Address: ${data.address}`);
  console.log(`PrivateKey: ${data.privateKey}`);
};

export const deployContracts = async () => {
  const contract = await Contract.findOne({ type: "FT" });
  const data = await Account.findOne({ userId: "admin" });
  if (contract === null) {
    /*
    Ganache 환경에서는 작동함
    */
    // try {
    //   const tx = await new web3.eth.Contract(abi)
    //     .deploy({ data: "0x" + bytecode })
    //     .send({ from: data.address, gas: 2000000, gasPrice: "1000000000000" });
    //   console.log(`Contract Deployed Successfully: ${tx.options.address}`);
    // } catch (err) {
    //   console.log(err);
    // }

    /*
    원격 노드(infura)를 통해 블록체인에 접근하려면 privatekey로 먼저 sign을 해야함
    */
    try {
      const nonce = await web3.eth.getTransactionCount(data.address);
      const gasPrice = await web3.eth.getGasPrice();
      // const gasLimit = 'await web3.eth.estimateGas({
      //   bytecode,
      // });'
      const gasLimit = "200000";

      const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        data: `0x${bytecode}`,
      };

      const { rawTransaction } = await web3.eth.accounts.signTransaction(
        txObject,
        data.privateKey
      );

      const { contractAddress } = await web3.eth.sendSignedTransaction(
        rawTransaction
      );
      // const tx = await new web3.eth.Contract(abi)
      //   .deploy({ data: "0x" + bytecode })
      //   .send({ from: data.address, gas: 2000000, gasPrice: "1000000000000" });
      console.log(`Contract Deployed Successfully: ${contractAddress}`);
      const newContract = new Contract({ contractAddress, type: "FT" });

      await newContract.save();
    } catch (err) {
      console.log(err);
    }
    return;
  }
  console.log("Contract is already deployed!");
  console.log(`Contract Address: ${data.contractAddress}`);
};
