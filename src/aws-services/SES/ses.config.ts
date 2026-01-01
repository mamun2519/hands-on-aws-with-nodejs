import config from "../../config";

class SESConfig {
  constructor() {
    // Configuration settings for AWS SES can be initialized here
    this.region = config.aws.region;
    this.accessKeyId = config.aws.accessKeyId;
    this.secretAccessKey = config.aws.secretAccessKey;
    this.fromEmail = config.aws.ses.fromEmail;
    this.forName = config.aws.ses.forName || "YourCompany";
  }
}
