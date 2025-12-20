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

// if need one time image view link generation
