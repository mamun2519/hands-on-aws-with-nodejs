import config from "../../config";
import {
  SNSClient,
  CreateTopicCommand,
  SubscribeCommand,
  PublishCommand,
  ListSubscriptionsByTopicCommand,
  UnsubscribeCommand,
} from "@aws-sdk/client-sns";

class SNSService {
  client: SNSClient;
  constructor() {
    //  AWS SNS Configuration
    this.client = new SNSClient({
      region: config.aws.sns.region,
      credentials: {
        accessKeyId: config.aws.sns.accessKeyId ?? "",
        secretAccessKey: config.aws.sns.secretAccessKey ?? "",
      },
    });
    this.createTopic = config.aws.sns.topicArn
      ? this.createTopic.bind(this)
      : async () => {
          throw new Error("SNS Topic ARN is not configured.");
        };
  }

  // ============================================
  // 1. Create SNS Topic
  // ============================================
  async createTopic(topicName: string) {
    const command = new CreateTopicCommand({
      Name: topicName,
      Tags: [
        { Key: "Environment", Value: "Production" },
        { Key: "Project", Value: "NotificationSystem" },
      ],
    });
    const response = await this.client.send(command);
    return response;
  }
}
