import { Request, Response } from "express";
import { S3Service } from "./services";

const getAllS3Files = async (req: Request, res: Response) => {
  const result = await S3Service.getAllFilesFormS3Bucket();

  res.status(200).json({
    message: "S3 Files fetched successfully",
    data: result,
  });
};

export const S3Controller = {
  getAllS3Files,
};
