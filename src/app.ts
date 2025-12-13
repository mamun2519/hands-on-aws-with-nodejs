import type { Application, Request, Response } from "express";
import express from "express";
const app: Application = express();

// middleware--------
app.use([express.json(), express.urlencoded({ extended: true })]);
// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
