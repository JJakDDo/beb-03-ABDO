import Web3 from 'web3';
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'; 

const web3 = new Web3('http://127.0.0.1:7545');

MongoClient.connect(MONGODB_URI, {useNewUrlParser: true}, async (err, client) => {
  if(err) return console.log(err);

  const db = client.db('test');
  const contractCollection = db.collection('contracts');
  const transactionCollection = db.collection('transactions');
  const accountCollection = db.collection('accounts');

  const fungibleTokenContract = await contractCollection.findOne({type: 'FT'});
  const fungibleTokenContractAddress = fungibleTokenContract.contractAddress;

  const latestBlock = await web3.eth.getBlockNumber();

  for(let i = 0; i <= latestBlock; i++) {
	const block = await web3.eth.getBlock(i);

	for(let tx of block.transactions) {
	  const receipt = await web3.eth.getTransactionReceipt(tx);

	  if(receipt.to === fungibleTokenContractAddress.toLowerCase() || receipt.from === fungibleTokenContractAddress.toLowerCase()) {
		const foundTransaction = await transactionCollection.findOneAndDelete({txHash: tx});

		if(!foundTransaction.value) continue;

		console.log('Founded: ', foundTransaction.value);

		if(receipt.status) {
		  await accountCollection.findOneAndUpdate({userId: foundTransaction.value.userId}, {$inc: {token: foundTransaction.value.token}});
		}
	  }
	}
  }

  client.close();
});
