import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

interface AuthRequest extends Request {
  userId?: JwtPayload;
}

const JWT_SECRET: string = process.env.JWT_SECRET!;

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json("Authorization failed!");
  }
};

export default authMiddleware;
