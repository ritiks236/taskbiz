import express, { Request, Response } from "express";
const router = express.Router();

import zod from "zod";
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/authMiddleware";

interface AuthRequest extends Request {
  userId?: JwtPayload;
}

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET!;

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string().optional(),
  password: zod.string(),
});

router.post("/signup", async (req: Request, res: Response) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already exists",
    });
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.json({
    message: "Signup successfully",
    token: token,
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req: Request, res: Response) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(401).json({ message: "Incorrect Inputs" });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (!existingUser) {
    return res.status(411).json({ message: "Email not exist" });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.status(404).json({
      message: "Incorrect password",
    });
  }

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.json({
    message: "Logged In successfully",
    token: token,
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/edit", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(404).json({
      message: "Incorrect Inputs",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  return res.json({
    message: "Updated successfully",
  });
});

export default router;
