import Account from '../models/account.js';
import Contract from '../models/contract.js';
import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';
import {abi} from '../contract.js';

const web3 = new Web3('http://127.0.0.1:7545');

// Create Account
export const createAccount = async (req, res) => {
  const body = req.body;
  const account = web3.eth.accounts.create();
  const newBody = {...body, address: account.address, privateKey: account.privateKey};
  const newAccount = new Account(newBody);

  try {
	const fungibleTokenContract = await Contract.findOne({type: 'FT'});
	const adminAccount = await Account.findOne({userId: 'admin'});

	const web3FTContract = new web3.eth.Contract(abi, fungibleTokenContract.contractAddress);

	const dataTx = web3FTContract.methods.mintToken(account.address, 50).encodeABI();
	const rawTx = {
	  to: fungibleTokenContract.contractAddress,
	  from: adminAccount.address,
	  data: dataTx,
	  gas: 2000000
	}

	const {rawTransaction, transactionHash} = await web3.eth.accounts.signTransaction(rawTx, adminAccount.privateKey);
	console.log('rawTransaction: ', rawTransaction);
	console.log('transactionHash: ', transactionHash);
	const newTransaction = new Transaction({txHash: transactionHash, method: 'mintToken', token: 50, userId: body.userId});

	await newAccount.save();
	await newTransaction.save();

	// 트랜잭션을 보내놓기만 하고 daemon이 확인 후 토큰갯수를 올려줄거기 때문에 await 불필요
    web3.eth.sendSignedTransaction(rawTransaction);

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
		const token = jwt.sign({userId: foundAccount.userId, nickname: foundAccount.nickname}, '123');
		res.status(201).json({token, userId: foundAccount.userId});
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
