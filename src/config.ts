import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
//Dot Env Config-----
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  aws: {
    // s3 important details
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      s3BucketName: process.env.S3_BUCKET_NAME,
      bucketUrl: process.env.BUCKET_URL,
    },
    // sns important details
    sns: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.SNS_TOPIC_REGION,
      topicArn: process.env.SNS_TOPIC_ARN,
    },
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.SNS_TOPIC_REGION,
    topicArn: process.env.SNS_TOPIC_ARN,
  },
};
