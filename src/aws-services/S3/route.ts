import express from "express";
const router = express.Router();

router.get("/s3-health", (req, res) => {
  res.send("S3 Service is healthy");
});

export const S3Route = router;
