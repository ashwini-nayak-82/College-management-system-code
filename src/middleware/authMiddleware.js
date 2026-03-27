import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "your_secret_key");

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const allowOnlyStaff = (req, res, next) => {
  if (!req.user || req.user.role !== "staff") {
    return res.status(403).json({ message: "Only staff allowed" });
  }

  next();
};