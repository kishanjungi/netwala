import { v4 as uuid } from "uuid";

export default (req, res, next) => {
  req.requestId = uuid();
  res.setHeader("X-Request-Id", req.requestId);
  next();
};
