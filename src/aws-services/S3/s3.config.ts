import AWS from "aws-sdk";
import config from "../../config";

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: config.aws.s3.accessKeyId ?? "",
  secretAccessKey: config.aws.s3.secretAccessKey ?? "",
  region: config.aws.s3.region,
});

export default s3;
