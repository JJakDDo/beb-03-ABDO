import { web3 } from "./web3.js";
import Account from "./models/account.js";
import Contract from "./models/contract.js";
import { abi, bytecode } from "./contract.js";

export const createServerAccount = () => {
  return new Promise(async (resolve, reject) => {
    try {
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
        await newAccount.save();
        resolve();
        return;
      }
      console.log("Server account is already existed!");
      console.log(`Address: ${data.address}`);
      console.log(`PrivateKey: ${data.privateKey}`);
      resolve();
      return;
    } catch (err) {
      reject(err);
    }
  });
};

export const deployContracts = () => {
  return new Promise(async (resolve, reject) => {
    try {
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
        const nonce = await web3.eth.getTransactionCount(data.address);
        const gasPrice = await web3.eth.getGasPrice();
        // const gasLimit = await web3.eth.estimateGas({
        //   bytecode: `0x${bytecode}`,
        // });

        // 컨트랙트 배포할 때 필요한 가스량 알아내는 방법
        let contract = new web3.eth.Contract(abi);
        const bytecodeWithEncodedParameters = contract
          .deploy({
            data: bytecode,
          })
          .encodeABI();

        const gasLimit = await web3.eth.estimateGas({
          data: bytecodeWithEncodedParameters,
        });
        //const gasLimit = "2000000";

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
        resolve();
        return;
      }

      console.log("Contract is already deployed!");
      console.log(`Contract Address: ${contract.contractAddress}`);
      resolve();
      return;
    } catch (err) {
      reject(err);
    }
  });
};

/*
  생성된 서버 계정에 ETH 보내기
  Ganache 환경에서는 private key 없이 보낼 수 있지만
  만약 테스트넷에 배포를 하게되면 private key가 필요
*/
export const getFaucet = async (amount) => {
  const data = await Account.findOne({ userId: "admin" });
  const contract = await Contract.findOne({ type: "FT" });
  if (data === null) {
    console.log("Server account is not created!");
    return;
  }
  if (contract !== null) {
    console.log("No need to get initial ETH");
    return;
  }
  const faucetAccount = (await web3.eth.getAccounts())[0];
  return new Promise(async (resolve, reject) => {
    try {
      await web3.eth.sendTransaction({
        from: faucetAccount,
        to: data.address,
        value: web3.utils.toWei(amount.toString(), "ether"),
      });
      console.log(`${amount} ETH is sent to server account!`);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
