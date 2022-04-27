import jwt from "jsonwebtoken";
import CustomError from "../errors/index.js";

/*
  request 헤더에 토큰이 있는지 확인
*/
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw CustomError.Unauthenticated("Not Authorized!");
  }

  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "123", (err, data) => {
    if (err) {
      throw CustomError.Unauthenticated("Token is invalid!");
    }
    req.body = { ...req.body, ...data };
    next();
  });
};
