import { Request, Response } from "express";
import { S3Service } from "./s3.services";

const getAllS3Files = async (req: Request, res: Response) => {
  const result = await S3Service.getAllFilesFormS3Bucket();

  res.status(200).json({
    message: "S3 Files Retrieved successfully.",
    data: result,
  });
};

const getSingleS3File = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await S3Service.getSingleFileFromS3Bucket(key);

  res.status(200).json({
    message: "S3 File retrieved successfully",
    data: result,
  });
};

const uploadS3File = async (req: Request, res: Response) => {
  const { key } = req.params;
  // @typeing issue with multer file buffer
  const body = req?.file?.buffer as any;

  if (!body) {
    return res.status(400).json({ message: "File is required" });
  }

  const result = await S3Service.uploadFileToS3Bucket(key, body);

  res.status(200).json({
    message: "File uploaded successfully.",
    data: result,
  });
};

const deleteS3File = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await S3Service.deleteFileFromS3Bucket(key);

  res.status(200).json({
    message: "File deleted successfully.",
    data: result,
  });
};

// if need one time image view link generation
const generatePresignedUrl = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await S3Service.generatePresignedUrl(key);

  res.status(200).json({
    message: "Presigned URL generated successfully.",
    data: result,
  });
};
export const S3Controller = {
  getAllS3Files,
  getSingleS3File,
  uploadS3File,
  deleteS3File,
  generatePresignedUrl,
};
