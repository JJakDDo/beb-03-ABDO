import Account from "../models/account.js";
import mongoose from "mongoose";
import { deployContracts } from "../initSetting.js";

/*
  admin 계정만 컨트랙트를 배포
*/
export const deploy = async (req, res) => {
  const { userId, password } = req.body;
  // req.body에 필요한 값들이 없으면 400 에러 응답
  if (!userId || !password) {
    return res.status(400).json({
      status: "fail",
      message: "ID or password is missing",
    });
  }

  // 해당 닉네임을 가진 유저의 db id를 가져옴
  const data = await Account.findOne({ userId, password });
  if (data === null) {
    return res.status(400).json({
      status: "fail",
      message: "Only admin can request",
    });
  }

  try {
    await deployContracts();

    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
