import config from "../../config";
import s3 from "./config";

const getAllS3Files = async () => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
  };
  const result = s3.listObjectsV2(params).promise();

  return result;
};

const getSingleFileFromS3Bucket = async (key: string) => {};

export const S3Service = {
  getAllS3Files,
};
