import config from "../../config";
import s3 from "./config";

const getAllFilesFormS3Bucket = async () => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
  };
  const result = await s3.listObjectsV2(params).promise();

  return {
    s3Information: result,
    bucketUrl: result.Contents?.map((item) => {
      return `${config.aws.s3.bucketUrl}/${item.Key}`;
    }),
  };
};

const getSingleFileFromS3Bucket = async (key: string) => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
    Key: key,
  };

  const result = await s3.getObject(params).promise();
  return result;
};

const uploadFileToS3Bucket = async (
  key: string,
  body: Buffer | Uint8Array | Blob | string
) => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
    Key: key,
    Body: body,
  };
  const result = s3.upload(params).promise();
  return result;
};

const deleteFileFromS3Bucket = async (key: string) => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
    Key: key,
  };

  const result = await s3.deleteObject(params).promise();
  return result;
};

// if need one time image view link generation
const generatePresignedUrl = (key: string) => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
    Key: key,
    Expires: 60 * 2, // URL expiration time in seconds
  };

  const result = s3.getSignedUrl("getObject", params);
};

export const S3Service = {
  getAllFilesFormS3Bucket,
  getSingleFileFromS3Bucket,
  uploadFileToS3Bucket,
  deleteFileFromS3Bucket,
};
