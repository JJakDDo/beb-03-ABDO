import { web3 } from "./web3.js";
import Account from "./models/account.js";
import Contract from "./models/contract.js";

/*
 서버의 지갑을 생성한다.
*/
export const createServerAccount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Account.findOne({ userId: "admin" });
      //만약 서버 계정이 db에 존재하지 않으면 새롭게 생성한다.
      if (data === null) {
        // web3 모듈을 사용해서 지갑을 생성
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

/*
  스마트컨트랙트를 배포한다.
*/
export const deployContracts = (type, abi, bytecode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await Contract.findOne({ type });
      const data = await Account.findOne({ userId: "admin" });
      if (contract === null) {
        /*
        원격 노드(infura)를 통해 블록체인에 접근하려면 privatekey로 먼저 sign을 해야함
        */
        const nonce = await web3.eth.getTransactionCount(
          data.address,
          "pending"
        );
        const gasPrice = await web3.eth.getGasPrice();

        // 컨트랙트 배포할 때 필요한 가스량 알아내는 방법
        let contract = new web3.eth.Contract(abi);
        const bytecodeWithEncodedParameters = contract
          .deploy({
            data: bytecode,
          })
          .encodeABI();

        const gasLimit = await web3.eth.estimateGas({
          data: bytecodeWithEncodedParameters,
		  from: data.address,
		  gasPrice: web3.utils.toHex(gasPrice)
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
        console.log(`Contract Deployed Successfully: ${contractAddress}`);
        const newContract = new Contract({ contractAddress, type });

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
  // 서버 계정을 만들어야 ETH를 받을 수 있음
  if (data === null) {
    console.log("Server account is not created!");
    return;
  }
  // 컨트랙트가 이미 배포된 상태이면 ETH를 받을 필요가 없음
  if (contract !== null) {
    console.log("No need to get initial ETH");
    return;
  }
  // 가나슈 환경에서 첫번째 계정으로부터 ETH를 받음
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

export const setToken = async (nftAbi) => {
  const admin = await Account.findOne({ userId: "admin" });
  if (!admin) {
    console.log("Server account is not created!");
    return;
  }
  const FTcontract = await Contract.findOne({ type: "FT" });
  if (!FTcontract) {
    console.log("ERC20 Smart Contract is not deployed!");
    return;
  }
  const NFTcontract = await Contract.findOne({ type: "NFT" });
  if (!NFTcontract) {
    console.log("ERC721 Smart Contract is not deployed!");
    return;
  }
  const NFTContract = new web3.eth.Contract(
    nftAbi,
    NFTcontract.contractAddress
  );
  // pending 상태인 트랜잭션도 포함해서 transaction count를 가져온다.
  const nonce = await web3.eth.getTransactionCount(admin.address, "pending");
  const gasPrice = await web3.eth.getGasPrice();
  // 함수를 호출하기위해 bytecode를 가져온다.
  const bytecode = NFTContract.methods
    .setToken(FTcontract.contractAddress)
    .encodeABI();
  // 함수를 호출할 때 필요한 가스량을 가져온다.
  const gasLimit = await NFTContract.methods
    .setToken(FTcontract.contractAddress)
    .estimateGas({
      from: admin.address,
      gasPrice: web3.utils.toHex(gasPrice),
    });

  const txObject = {
    nonce: web3.utils.toHex(nonce),
    from: admin.address,
    to: NFTcontract.contractAddress,
    gasLimit: web3.utils.toHex(gasLimit),
    gasPrice: web3.utils.toHex(gasPrice),
    data: bytecode,
  };
  const { rawTransaction } = await web3.eth.accounts.signTransaction(
    txObject,
    admin.privateKey
  );

  await web3.eth.sendSignedTransaction(rawTransaction);
  console.log("ERC20 token is set!");
};
