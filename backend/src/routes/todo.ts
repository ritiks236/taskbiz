import express, { Request, Response } from "express";
const router = express.Router();
import Task from "../models/task";
import authMiddleware from "../middlewares/authMiddleware";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: JwtPayload;
}

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({
    userId: req.userId,
  });

  return res.json(tasks);
});

router.post(
  "/create",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return new Response("Title required", { status: 500 });
      }

      const task = await Task.create({
        userId: req.userId,
        title: title,
        description: description,
      });

      return res.json("Task Created");
    } catch (err) {
      console.error(err);

      return new Response("Task creation failed!", { status: 401 });
    }
  },
);

router.put(
  "/success",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const taskId = req.query.id;

      const task = await Task.findOne({
        userId: req.userId,
        _id: taskId,
      });

      if (!task) {
        return res.status(411).json({
          message: "Task Does not exist",
        });
      }

      await Task.findOneAndUpdate(
        {
          _id: taskId,
        },
        {
          status: true,
        },
      );

      return res.status(200).json({
        message: "Task Completed",
      });
    } catch (err) {
      console.error(err);
      return res.status(404).json({
        message: "Failed!",
      });
    }
  },
);

export default router;
