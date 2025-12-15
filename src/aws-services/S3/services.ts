import config from "../../config";

const getAllS3Files = async () => {
  const params = {
    Bucket: config.aws.s3.s3BucketName,
  };
  return s3.listObjectsV2(params).promise();
};
