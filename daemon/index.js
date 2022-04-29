import Web3 from 'web3';
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'; 

const web3 = new Web3(process.env.NODE_URI || 'http://127.0.0.1:7545');

MongoClient.connect(MONGODB_URI, {useNewUrlParser: true}, async (err, client) => {
  if(err) return console.log(err);

  // 필요한 collection 불러오기
  const db = client.db('test');
  const contractCollection = db.collection('contracts');
  const transactionCollection = db.collection('transactions');
  const accountCollection = db.collection('accounts');
  const nftCollection = db.collection('nfts');

  const fungibleTokenContract = await contractCollection.findOne({type: 'FT'});
  const fungibleTokenContractAddress = fungibleTokenContract.contractAddress.toLowerCase();
  const nonFungibleTokenContract = await contractCollection.findOne({type: 'NFT'});
  const nonFungibleTokenContractAddress = nonFungibleTokenContract.contractAddress.toLowerCase();

  const latestBlock = await web3.eth.getBlockNumber();

  // blockNumber.txt 파일에서 검사한 최신 블록넘버 받기
  let checkedBlockNum = Number(fs.readFileSync('./blockNumber.txt', {encoding: 'utf-8'}));
  // 만약에 checkedBlockNum이 -1이면 최신 블록넘버로 재할당
  if(checkedBlockNum === -1) checkedBlockNum = latestBlock;

  for(let i = checkedBlockNum; i <= latestBlock; i++) {
	const block = await web3.eth.getBlock(i);

	console.log(i);
	for(let tx of block.transactions) {
	  const receipt = await web3.eth.getTransactionReceipt(tx);

	  if(receipt.to === fungibleTokenContractAddress || receipt.from === fungibleTokenContractAddress || receipt.to === nonFungibleTokenContractAddress || receipt.from === nonFungibleTokenContractAddress) {
		const foundTransaction = await transactionCollection.findOneAndDelete({txHash: tx});

		if(!foundTransaction.value) continue;

		console.log('Founded: ', foundTransaction.value);

		if(foundTransaction.value.method === 'mintToken') {
		  if(receipt.status) {
			await accountCollection.findOneAndUpdate({userId: foundTransaction.value.userId}, {$inc: {token: foundTransaction.value.token}});
		  }
		} else if(foundTransaction.value.method === 'mintNFT') {
		  if(receipt.status) {
			const foundNft = await nftCollection.findOne({productId: foundTransaction.value.productId});
			await accountCollection.findOneAndUpdate({userId: foundTransaction.value.userId}, {$inc: {token: -foundTransaction.value.token}, '$push': {nft: {productId: foundNft.productId, name: foundNft.name, url: foundNft.url, price: foundNft.price}}});
		  }
		}
	  }
	}
  }

  // blockNumber.txt파일의 검사한 블록넘버를 최신블록넘버로 교체
  fs.writeFileSync('./blockNumber.txt', String(latestBlock), {encoding: 'utf-8'});

  client.close();
});
