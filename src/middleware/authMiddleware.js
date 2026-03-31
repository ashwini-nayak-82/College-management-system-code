import jwt from "jsonwebtoken";
import { RESPONSE } from "../constants/global.js";
import { send, setErrmsg } from "../helper/responsehelper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return send(res, setErrmsg(RESPONSE.ERROR, "No token"));
    }

    const token = header;

    if (!token) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Invalid token format"));
    }

    const decoded = jwt.verify(token, "secretKey");

    req.user = decoded;

    next();
  } catch (err) {
    return send(res, setErrmsg(RESPONSE.ERROR, "Invalid token"));
  }
};

export const allowOnlyStaff = (req, res, next) => {
  if (!req.user || req.user.role !== "staff") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
