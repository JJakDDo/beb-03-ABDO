import Account from '../models/account.js';
import mongoose from 'mongoose';

export const createAccount = async (req, res) => {
  const body = req.body;
  const newAccount = new Account(body);

  try {
	await newAccount.save();

	res.status(201).json(newAccount);
  } catch(err) {
	res.status(409).json({message: err.message});
  }
}
