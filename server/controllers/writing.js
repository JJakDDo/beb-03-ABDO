import Writing from "../models/writing.js";
import Account from "../models/account.js";
import Transaction from "../models/transaction.js";
import Contract from "../models/contract.js";
import mongoose from "mongoose";
import { web3 } from "../web3.js";
import FTabi from "../contracts/AbdoTokenAbi.js";
import CustomError from "../errors/index.js";

/*
  작성한 글을 db에 저장
*/
export const postWriting = async (req, res, next) => {
  const { title, content, nickname, userId } = req.body;
  // req.body에 필요한 값들이 없으면 Bad Request 에러 응답
  if (!title || !content || !nickname) {
    throw CustomError.BadRequest("Title, content or nickname is missing");
  }

  // 해당 닉네임을 가진 유저의 db id를 가져옴
  const { _id, address: userAddress } = await Account.findOne({ nickname });

  const newWriting = new Writing({
    title,
    content,
    nickname,
    writer: _id,
    comments: [],
    likes: [],
  });

  try {
    // db에 저장
    const { _id } = await newWriting.save();

    // 저장 후 토큰 지급
    await mintToken(userAddress, userId, 5);
    res.status(201).json({ status: "success", data: { writingId: _id } });
  } catch (err) {
    throw new Error(err);
  }
};

/*
  Writing ID를 받아서 해당 writing에 대한 정보를 응답
*/
export const getWritingById = async (req, res) => {
  const id = req.params.id;

  //전달받은 id를 가진 writing을 찾아옴
  const data = await Writing.findById(id);

  //해당 id를 가진 writing 없으면 에러 응답
  if (!data) {
    throw CustomError.BadRequest(`Writing ID: ${id} does not exist!`);
  }

  const { _id, title, content, writer, comments, likes, createdAt } = data;

  const { userId, nickname } = await Account.findById(writer);

  // db에 likes가 유저의 object id로 저장이 되어있기 때문에
  // 응답으로 보내줄 때는 유저의 id로 바꿔서 보내준다.

  const newLikes = await convertLikesArray(likes);

  // db에 comments가 유저의 object id로 저장이 되어있기 때문에
  // 응답으로 보내줄 때는 유저의 id와 닉네임을 추가해서 보내준다.
  const newComments = await convertCommentsArray(comments);

  res.status(200).json({
    status: "success",
    data: {
      id: _id,
      title,
      content,
      writer: userId,
      nickname,
      comments: newComments,
      likes: newLikes,
      createdAt,
    },
  });
};

/*
  db에 존재하는 모든 writing을 응답
*/
export const getAllWriting = async (req, res) => {
  const writings = await Writing.find();
  // Array에 map을 돌 때 콜백함수가 비동기면 일반적인 방법으로는 구현이 안됨
  // 그래서 Promise.all을 사용함
  const data = await Promise.all(
    writings.map(
      async ({ _id, title, content, writer, comments, likes, createdAt }) => {
        const { userId, nickname } = await Account.findById(writer);

        // db에 likes가 유저의 object id로 저장이 되어있기 때문에
        // 응답으로 보내줄 때는 유저의 id로 바꿔서 보내준다.

        const newLikes = await convertLikesArray(likes);

        // db에 comments가 유저의 object id로 저장이 되어있기 때문에
        // 응답으로 보내줄 때는 유저의 id와 닉네임을 추가해서 보내준다.
        const newComments = await convertCommentsArray(comments);

        return {
          id: _id,
          title,
          content,
          writer: userId,
          nickname,
          comments: newComments,
          likes: newLikes,
          createdAt,
        };
      }
    )
  );

  res.status(200).json({
    status: "success",
    data,
  });
};

/*
  글에 좋아요 눌렀을 때 누른 사람의 정보를 writing에 저장
*/
export const addLikeToWriting = async (req, res) => {
  const { writingId, userId } = req.body;

  // writingId를 가진 writing이 있는지 확인
  const writing = await Writing.findById(writingId);
  if (!writing) {
    throw CustomError.BadRequest(`Writing ID: ${writingId} does not exist!`);
  }
  const { likes, writer } = writing;
  // user가 존재하는지 확인
  const user = await Account.findOne({ userId });
  if (!user) {
    throw CustomError.BadRequest(`user ID: ${userId} does not exist!`);
  }
  const { _id } = user;
  // 좋아요는 한번 밖에 누르지 못하기 때문에
  // 먼저 writing의 likes에 userId가 존재하는지 확인
  // 존재한다면, 에러 응답
  if (likes.includes(_id)) {
    throw CustomError.BadRequest(`Cannot send like again`);
  }
  // writing 컬렉션에서 해당 writing likes에 userId 추가하기
  likes.push(_id);

  // writer의 address와 id 가져오기
  const { address: writerAddress, userId: writerId } = await Account.findById(
    writer
  );

  try {
    await Writing.updateOne({ _id: writingId }, { likes });
    await mintToken(writerAddress, writerId, 1);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw new Error(err);
  }
};

/*
  댓글을 달았을 때 해당 정보를 writing에 저장
*/
export const commentToWriting = async (req, res) => {
  const { writingId, userId, comment } = req.body;

  // writingId를 가진 writing이 있는지 확인
  const writing = await Writing.findById(writingId);
  if (!writing) {
    throw CustomError.BadRequest(`Writing ID: ${writingId} does not exist!`);
  }
  // user가 존재하는지 확인
  const user = await Account.findOne({ userId });
  if (!user) {
    throw CustomError.BadRequest(`user ID: ${userId} does not exist!`);
  }
  const { _id, address: userAddress } = user;

  const { comments } = writing;
  // writing 컬렉션에서 해당 writing comments에 comment 추가하기
  comments.push({
    userId: _id,
    comment,
  });

  try {
    await Writing.updateOne({ _id: writingId }, { comments });
    await mintToken(userAddress, userId, 1);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    throw new Error(err);
  }
};

/*
  ERC20 토큰을 민팅한다.
*/
const mintToken = async (toAddress, toId, amount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { address: adminAddress, privateKey: adminPrivateKey } =
        await Account.findOne({ userId: "admin" });
      const { contractAddress } = await Contract.findOne({ type: "FT" });

      const gasPrice = await web3.eth.getGasPrice();
      const FTContract = new web3.eth.Contract(FTabi, contractAddress);
      // 토큰에는 소수점 18자리가 있기 때문에 wei로 변경해준다.
      const amountInWei = web3.utils.toWei(amount.toString(), "ether");
      // 함수를 호출하기위해 bytecode를 가져온다.
      const bytecode = FTContract.methods
        .mintToken(toAddress, amountInWei)
        .encodeABI();
      // 함수를 호출할 때 필요한 가스량을 가져온다.
      const gasLimit = await FTContract.methods
        .mintToken(toAddress, amountInWei)
        .estimateGas({
          from: adminAddress,
          gasPrice: web3.utils.toHex(gasPrice),
        });

      // pending 상태인 트랜잭션도 포함해서 transaction count를 가져온다.
      const nonce = await web3.eth.getTransactionCount(adminAddress, "pending");

      const txObject = {
        nonce: web3.utils.toHex(nonce),
        from: adminAddress,
        to: contractAddress,
        gasLimit: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        data: bytecode,
      };
      const { rawTransaction, transactionHash } =
        await web3.eth.accounts.signTransaction(txObject, adminPrivateKey);

      const newTransaction = new Transaction({
        txHash: transactionHash,
        method: "mintToken",
        token: amount,
        userId: toId,
      });

      web3.eth.sendSignedTransaction(rawTransaction);

      await newTransaction.save();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

// db에 likes가 유저의 object id로 저장이 되어있기 때문에
// 응답으로 보내줄 때는 유저의 id로 바꿔서 보내준다.
const convertLikesArray = async (likes) => {
  // Array에 map을 돌 때 콜백함수가 비동기면 일반적인 방법으로는 구현이 안됨
  // 그래서 Promise.all을 사용함
  return await Promise.all(
    likes.map(async (id) => {
      const { userId } = await Account.findById(id);
      return userId;
    })
  );
};

// db에 comments가 유저의 object id로 저장이 되어있기 때문에
// 응답으로 보내줄 때는 유저의 id와 닉네임을 추가해서 보내준다.
const convertCommentsArray = async (comments) => {
  // Array에 map을 돌 때 콜백함수가 비동기면 일반적인 방법으로는 구현이 안됨
  // 그래서 Promise.all을 사용함
  return await Promise.all(
    comments.map(async (el) => {
      const { userId, nickname } = await Account.findById(el.userId);
      return {
        userId,
        nickname,
        comment: el.comment,
      };
    })
  );
};
