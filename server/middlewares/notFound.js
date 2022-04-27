import CustomError from "../errors/index.js";

export const notFound = (req, res) => {
  throw CustomError.NotFound("Route does not exist!");
};
