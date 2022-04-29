// Import models
import Account from '../models/account.js';
import Contract from '../models/contract.js';
import Transaction from '../models/transaction.js';

// Import packages
import mongoose from 'mongoose';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Import ABI from contract.js
import AbdoTokenAbi from '../contracts/AbdoTokenAbi.js';

// Import web3 from web3.js
import {web3} from '../web3.js';

dotenv.config();

// Create Account
export const createAccount = async (req, res) => {
  const body = req.body;

  try {
	const foundAccount = await Account.findOne({userId: body.userId});
	if(foundAccount) throw new Error('User ID already exists');

	const account = web3.eth.accounts.create();
  	const newBody = {...body, address: account.address, privateKey: account.privateKey};
  	const newAccount = new Account(newBody);

	// DB에서 smart contract 정보와 admin 계정 정보를 가져온다.
	const fungibleTokenContract = await Contract.findOne({type: 'FT'});
	const adminAccount = await Account.findOne({userId: 'admin'});

	// DB에서 가져온 데이터를 토대로 contract 객체 생성
	const web3FTContract = new web3.eth.Contract(AbdoTokenAbi, fungibleTokenContract.contractAddress);

	// smart contract의 mintToken 함수 호출 부분
	const dataTx = web3FTContract.methods.mintToken(account.address, web3.utils.toWei('50')).encodeABI();
	const rawTx = {
	  to: fungibleTokenContract.contractAddress,
	  from: adminAccount.address,
	  data: dataTx,
	  gas: 2000000,
	  // 두번째 인자로 'pending'을 주어야지 pending 상태인 transaction 까지 계산해서 nonce 값을 제공해준다.
	  nonce: await web3.eth.getTransactionCount(adminAccount.address, 'pending')
	}

	// transaction을 보내기전에 sign 해준다.
	const {rawTransaction, transactionHash} = await web3.eth.accounts.signTransaction(rawTx, adminAccount.privateKey);

	// DB에 위에서 생성된 transactionHash를 저장해주기위해 Transaction 모델을 이용해 데이터 생성
	const newTransaction = new Transaction({txHash: transactionHash, method: 'mintToken', token: 50, userId: body.userId});

	// DB에 account와 transaction 데이터 저장
	await newAccount.save();
	await newTransaction.save();

	// 트랜잭션을 보내놓기만 하고 daemon이 확인 후 토큰갯수를 올려줄거기 때문에 await 불필요
    web3.eth.sendSignedTransaction(rawTransaction)
	  .on('error', console.log);

	res.status(201).json(newAccount);
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

export const getBalance = async (req, res) => {
  const fungibleTokenContract = await Contract.findOne({type: 'FT'});
  const adminAccount = await Account.findOne({userId: 'admin'});

  const web3FTContract = new web3.eth.Contract(abi, fungibleTokenContract.contractAddress, {
	from: adminAccount.address,
	gasPrice: '2000000'
  });

  const balance = await web3FTContract.methods.balanceOf(req.params.address).call();
  res.json(balance);
}

// Get Account
export const getAccount = async (req, res) => {
  const params = req.params;

  try {
	const foundAccount = await Account.findOne({userId: params.userId});

	if(foundAccount) {
	  res.status(200).json(foundAccount);
	} else {
	  res.status(404).json({message: 'Cannot find account'});
	}
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}

// Login
export const login = async (req, res) => {
  const body = req.body;

  try {
	const foundAccount = await Account.findOne({userId: body.userId});

	if(foundAccount) {
	  if(foundAccount.password === body.password) {
		const jsonWebToken = jwt.sign({userId: foundAccount.userId, nickname: foundAccount.nickname}, '123');
		res.status(201).json({jsonWebToken, userId: foundAccount.userId, nickname: foundAccount.nickname, token: foundAccount.token, nft: foundAccount.nft});
	  } else{
		res.status(404).json({message: 'Wrong password'});
	  }
	} else {
	  res.status(404).json({message: 'Wrong userId'});
	}
  } catch(err) {
	res.status(400).json({message: err.message});
  }
}
