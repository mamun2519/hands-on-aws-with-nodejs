import config from "../../config";
import AWS from "aws-sdk";
const SNS = new AWS.SNS({
  accessKeyId: config.aws.s3.accessKeyId,
  secretAccessKey: config.aws.s3.secretAccessKey,
  region: config.aws.s3.region,
});

export default SNS;
