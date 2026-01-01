import { SESClient } from "@aws-sdk/client-ses";
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

  //   generate client and retune
  getClient() {
    return new SESClient({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }
}

//   email queue (Handle bulk email sending with queuing mechanism) if need you can use
class SESEmailQueue {
  queue: Array<any>;
  processing: number;
  maxConcurrent: number;
  results: Array<any>;
  // Implementation for email queuing can be added here
  constructor(maxConcurrent = 5) {
    this.queue = [];
    this.processing = 0;
    this.maxConcurrent = maxConcurrent;
    this.results = [];
  }

  add(EmailFunction: () => Promise<any>, data: any) {
    return new Promise((resolve, reject) => {
      this.queue.push({ ...EmailFunction, data, resolve, reject });
      this.processNext();
    });
  }

  private processNext() {
    while (this.processing < this.maxConcurrent && this.queue.length > 0) {
      const EmailFunction = this.queue.shift()!;
      this.processing++;
      EmailFunction()
        .then((result) => {
          this.results.push(result);
        })
        .catch((error) => {
          this.results.push({ error });
        })
        .finally(() => {
          this.processing--;
          this.processNext();
        });
    }
  }
}
