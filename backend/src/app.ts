import express, { Application, Request, Response } from "express";
const app: Application = express();

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello app is running ");
});

app.listen(3000, () => {
  console.log(`Server is running at ${PORT}`);
});
