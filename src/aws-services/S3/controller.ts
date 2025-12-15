import { Request, Response } from "express";
import { S3Service } from "./services";

const getAllS3Files = async (req: Request, res: Response) => {
  const result = await S3Service.getAllS3Files();

  res;
};
