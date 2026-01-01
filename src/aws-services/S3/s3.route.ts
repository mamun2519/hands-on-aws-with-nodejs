import express from "express";
import { S3Controller } from "./controller";
const router = express.Router();

router.get("/s3-health", (req, res) => {
  res.send("S3 Service is healthy");
});
router.get("/s3-files", S3Controller.getAllS3Files);
router.get("/s3-files/:key", S3Controller.getSingleS3File);
router.post("/s3-files/:key", S3Controller.uploadS3File);
router.delete("/s3-files/:key", S3Controller.deleteS3File);
router.get("/s3-presigned-url/:key", S3Controller.generatePresignedUrl);

export const S3Route = router;
