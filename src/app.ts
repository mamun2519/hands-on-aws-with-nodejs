import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
const app: Application = express();

// middleware--------
app.use([express.json(), express.urlencoded({ extended: true })]);

app.use(
  cors({
    origin: "*",
  })
);

// api routes here

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
