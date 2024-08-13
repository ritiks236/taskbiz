import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import Task from "./models/task";
import rootRouter from "./routes/index";

const app: Application = express();
dotenv.config();

const PORT = process.env.PORT;
connectDB(); // connecting to database

app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", async (req: Request, res: Response) => {
  const users = await Task.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
