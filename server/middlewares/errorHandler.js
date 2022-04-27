import CustomError from "../errors/index.js";

export const errorHandler = (err, req, res, next) => {
  // 만약 err가 직접 구현한 Custom Error 라면 CustomError 객체에서
  // statusCode와 message 가져와서 응답하기
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }
  // CustomError가 아니면 서버에러로 응답
  return res.status(500).send("Something went wrong");
};
