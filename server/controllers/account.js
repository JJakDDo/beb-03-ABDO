import Account from '../models/account.js';
import mongoose from 'mongoose';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';

const web3 = new Web3('http://127.0.0.1:7545');

// Create Account
export const createAccount = async (req, res) => {
  const body = req.body;
  const account = web3.eth.accounts.create();
  const newBody = {...body, address: account.address, privateKey: account.privateKey};
  const newAccount = new Account(newBody);

  try {
	await newAccount.save();

	res.status(201).json(newAccount);
  } catch(err) {
	res.status(400).json({message: err.message});
  }
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
