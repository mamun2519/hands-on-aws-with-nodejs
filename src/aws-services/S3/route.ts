import express from "express";
import { S3Controller } from "./controller";
const router = express.Router();

router.get("/s3-health", (req, res) => {
  res.send("S3 Service is healthy");
});
router.get("/s3-files", S3Controller.getAllS3Files);

export const S3Route = router;
