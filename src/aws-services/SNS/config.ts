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
  }

  async createTopic(topicName: string) {
    const command = new CreateTopicCommand({ Name: topicName });
    const response = await this.client.send(command);
    return response;
  }
}
