export default class CustomError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.status = "fail";
    this.statusCode = statusCode;
  }

  // 요청이 잘못되었을 때 에러 응답
  static BadRequest = (msg) => {
    return new CustomError(msg, 400);
  };

  // 토큰이 잘못되었을 때 에러 응답
  static Unauthenticated = (msg) => {
    return new CustomError(msg, 401);
  };

  // 요청에 대한 권한이 없을 때 에러 응답
  static Forbidden = (msg) => {
    return new CustomError(msg, 403);
  };

  // Not Found
  static NotFound = (msg) => {
    return new CustomError(msg, 404);
  };
}
