// Import models
import Nft from '../models/nft.js';
import Account from '../models/account.js';

// Import packages
import mongoose from 'mongoose';

// Import web3 from web3.js
import {web3} from '../web3.js';

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

	foundAccount.nft.push(foundNft.productId);

	await foundAccount.save();

	res.status(201).json(foundAccount.nft);
  } catch(err) {
	res.status(409).json({message: err.message});
  }
}
