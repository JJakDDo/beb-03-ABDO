// Import models
import Nft from '../models/nft.js';
import Account from '../models/account.js';
import Contract from '../models/contract.js';
import Transaction from '../models/transaction.js';

// Import packages
import mongoose from 'mongoose';

// Import web3 from web3.js
import {web3} from '../web3.js';

// Import ABI for NFT contract
import AbdoNFTAbi from '../contracts/AbdoNFTAbi.js';

// Get NFTs
export const getNfts = async (req, res) => {
  try {
	const nfts = await Nft.find();

	res.status(200).json(nfts);
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

// Get NFT
export const getNft = async (req, res) => {
  try {
	const nft = await Nft.findOne({productId: req.params.productId});

	res.status(200).json(nft);
  } catch(err) {
	res.status(400).json({message: err.mesage});
  }
}

// Create NFT
export const createNft = async (req, res) => {
  const body = req.body;

  try {
	const newNft = new Nft(body);

	await newNft.save();

	res.status(201).json(newNft);
  } catch(err) {
	res.status(409).json({message: err.message});
  }
}

// Buy NFT
export const buyNft = async (req, res) => {
  const body = req.body;
  const params = req.params;

  try {
	const foundAccount = await Account.findOne({userId: body.userId});
	const foundNft = await Nft.findOne({productId: params.productId});

	if(foundNft.price > foundAccount.token) {
	  throw new Error('Insufficient Abdo Token');
	}

	const nonFungibleTokenContract = await Contract.findOne({type: 'NFT'});
	const adminAccount = await Account.findOne({userId: 'admin'});

	const web3NFTContract = new web3.eth.Contract(AbdoNFTAbi, nonFungibleTokenContract.contractAddress);
	
	// smart contract의 mintToken 함수 호출 부분
	const dataTx = web3NFTContract.methods.mintNFT(foundAccount.address, foundNft.url, web3.utils.toWei(String(foundNft.price))).encodeABI();
	const rawTx = {
	  to: nonFungibleTokenContract.contractAddress,
	  from: adminAccount.address,
	  data: dataTx,
	  gas: 2000000,
	  // 두번째 인자로 'pending'을 주어야지 pending 상태인 transaction 까지 계산해서 nonce 값을 제공해준다.
	  nonce: await web3.eth.getTransactionCount(adminAccount.address, 'pending')
	}

	// transaction을 보내기전에 sign 해준다.
	const {rawTransaction, transactionHash} = await web3.eth.accounts.signTransaction(rawTx, adminAccount.privateKey);

	// DB에 위에서 생성된 transactionHash를 저장해주기위해 Transaction 모델을 이용해 데이터 생성
	const newTransaction = new Transaction({txHash: transactionHash, method: 'mintNFT', token: foundNft.price, userId: body.userId, productId: params.productId});

	// DB에 transaction 데이터 저장
	await newTransaction.save();

	// 트랜잭션을 보내놓기만 하고 daemon이 확인 후 토큰갯수를 올려줄거기 때문에 await 불필요
    web3.eth.sendSignedTransaction(rawTransaction)
	  .on('error', console.log);

	// foundAccount.nft.push({productId: foundNft.productId, name: foundNft.name, url: foundNft.url, price: foundNft.price});

	await foundAccount.save();

	res.status(201).json(foundAccount.nft);
  } catch(err) {
	res.status(409).json({message: err.message});
  }
}
