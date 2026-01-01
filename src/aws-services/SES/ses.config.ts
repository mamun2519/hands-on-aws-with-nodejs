import config from "../../config";

class SESConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  fromEmail: string;
  forName: string;
  constructor() {
    // Configuration settings for AWS SES can be initialized here
    this.region = config.aws.region || "us-east-1";
    this.accessKeyId = config.aws.accessKeyId ?? "";
    this.secretAccessKey = config.aws.secretAccessKey ?? "";
    this.fromEmail = config.aws.ses.fromEmail || "";
    this.forName = config.aws.ses.forName || "YourCompany";

    this.validate();
  }
   
  // validate configuration
  validate() {
    if (!this.region) {
      throw new Error("SES region is not configured");
    }
    if (!this.accessKeyId) {
      throw new Error("SES access key ID is not configured");
    }
    if (!this.secretAccessKey) {
      throw new Error("SES secret access key is not configured");
    }
    if (!this.fromEmail) {
      throw new Error("SES from email is not configured");
    }
  }

  getClient (){
      return new SESClient({
        region: this.region,
        credentials: {
          accessKeyId: this.accessKeyId,
          secretAccessKey: this.secretAccessKey,
        },
      });   
  }
}
