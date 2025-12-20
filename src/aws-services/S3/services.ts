import config from "../../config";
import s3 from "./config";

const getAllFilesFormS3Bucket = async () => {
  const params = {
    Bucket: config.aws.s3.s3BucketName ?? "",
  };

  return {};
};

// if need one time image view link generation
