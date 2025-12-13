import type { Application, Request, Response } from "express";
import express from "express";
const app: Application = express();

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
