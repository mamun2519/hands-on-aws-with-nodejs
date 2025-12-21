import config from "../../config";
import AWS from "aws-sdk";
const SNS = new AWS.SNS({
  accessKeyId: config.aws.sns.accessKeyId,
  secretAccessKey: config.aws.sns.secretAccessKey,
  region: config.aws.sns.region,
});
