import { Request, Response } from "express";
import { S3Service } from "./services";

const getAllS3Files = async (req: Request, res: Response) => {
  const result = await S3Service.getAllFilesFormS3Bucket();

  res.status(200).json({
    message: "S3 Files fetched successfully",
    data: result,
  });
};

const getSingleS3File = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await S3Service.getSingleFileFromS3Bucket(key);

  res.status(200).json({
    message: "S3 File fetched successfully",
    data: result,
  });
};
export const S3Controller = {
  getAllS3Files,
};
