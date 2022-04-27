import Account from "../models/account.js";
import mongoose from "mongoose";
import { deployContracts } from "../initSetting.js";
import CustomError from "../errors/index.js";
import { abi, bytecode } from "../contract.js";

/*
  admin 계정만 컨트랙트를 배포
*/
export const deploy = async (req, res, next) => {
  const { userId, password } = req.body;
  // req.body에 필요한 값들이 없으면 Bad Request 에러 응답
  if (!userId || !password) {
    throw CustomError.BadRequest("ID or password is missing!");
  }

  // 해당 닉네임을 가진 유저의 db id를 가져옴
  const data = await Account.findOne({ userId, password });

  if (data === null) {
    // express-async-errors 모듈이 있으면 throw
    throw CustomError.BadRequest("Only admin can request!");

    // express-async-errors 모듈이 없으면 return next(err)
    // return next(CustomError.BadRequest("Only admin can request!"));
  }

  try {
    // ERC20 컨트랙트 배포
    await deployContracts("FT", abi, bytecode);
    // ERC721 컨트랙트 배포
    //await deployContracts("NFT");

    res.status(201).json({ status: "success" });
  } catch (err) {
    throw new Error(err);
  }
};
