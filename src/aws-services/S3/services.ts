import config from "../../config";
import s3 from "./config";

const getAllFilesFormS3Bucket = async () => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
  };
  const result = await s3.listObjectsV2(params).promise();

  return {};
};

// if need one time image view link generation
