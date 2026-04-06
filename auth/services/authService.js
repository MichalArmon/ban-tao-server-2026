import { verifyToken } from "../providers/jwtProvider.js";

import { verifyToken } from "../providers/jwtProvider.js";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Authentication error: please login!");
  }

  try {
    const userinfo = verifyToken(token);

    if (!userinfo) {
      return res.status(401).send("Authentication error: Unauthorized user!");
    }

    req.user = userinfo;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .send("Access denied: Only admin can perform this action!");
  }

  next();
};
