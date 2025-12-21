import config from "../../config";
import {
  SNSClient,
  CreateTopicCommand,
  SubscribeCommand,
  PublishCommand,
  ListSubscriptionsByTopicCommand,
  UnsubscribeCommand,
} from "@aws-sdk/client-sns";

export default class SNSService {
  client: SNSClient;
  topicArn?: string;
  constructor() {
    //  AWS SNS Configuration
    this.client = new SNSClient({
      region: config.aws.sns.region,
      credentials: {
        accessKeyId: config.aws.sns.accessKeyId ?? "",
        secretAccessKey: config.aws.sns.secretAccessKey ?? "",
      },
    });
    this.topicArn = config.aws.sns.topicArn as string;
    // ? this.createTopic.bind(this)
    // : async () => {
    //     throw new Error("SNS Topic ARN is not configured.");
    //   };
  }

  // ============================================
  //  Create SNS Topic
  // ============================================
  async createTopic(topicName: string) {
    try {
      const command = new CreateTopicCommand({
        Name: topicName,
        Tags: [
          { Key: "Environment", Value: "Production" },
          { Key: "Project", Value: "NotificationSystem" },
        ],
      });
      const response = await this.client.send(command);
      this.topicArn = response.TopicArn;
      return response;
    } catch (error) {
      console.error("Error creating topic:", error);
      throw new Error(`Failed to create topic: ${error}`);
    }
  }
  // ============================================
  //  Subscribe Email to Topic
  // ============================================
  async subscribeEmail(email: string) {
    try {
      if (!this.topicArn) {
        throw new Error("SNS Topic ARN is not configured.");
      }
      const command = new SubscribeCommand({
        Protocol: "email",
        TopicArn: this.topicArn,
        Endpoint: email,
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error("Error subscribing email:", error);
      throw new Error(`Failed to subscribe email: ${error}`);
    }
  }

  // ============================================
  //  Subscribe number to Topic
  // ============================================
  async subscribeSns(phoneNumber: string) {
    try {
      if (!this.topicArn) {
        throw new Error("SNS Topic ARN is not configured.");
      }
      const command = new SubscribeCommand({
        Protocol: "sms",
        TopicArn: this.topicArn,
        Endpoint: phoneNumber,
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error("Error subscribing phone number:", error);
      throw new Error(`Failed to subscribe phone number: ${error}`);
    }
  }

  // ============================================
  // 4. Publish Message (Production Function)
  // ============================================
  async publishMessage(subject: string, message: string, attributes = {}) {
    try {
      if (!this.topicArn) {
        throw new Error("SNS Topic ARN is not configured.");
      }

      // Message attributes for filtering (advanced)
      const messageAttributes: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(attributes as any)) {
        messageAttributes[key] = {
          DataType: "String",
          StringValue: value,
        };
      }
      const command = new PublishCommand({
        TopicArn: this.topicArn,
        Subject: subject,
        Message: message,
        MessageAttributes: messageAttributes,
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error("Error publishing message:", error);
      throw new Error(`Failed to publish message: ${error}`);
    }
  }

  // ============================================
  // 5. List All Subscriptions
  // ============================================
  async listSubscriptions() {
    if (!this.topicArn) {
      throw new Error("SNS Topic ARN is not configured.");
    }
    const command = new ListSubscriptionsByTopicCommand({
      TopicArn: this.topicArn,
    });
    const response = await this.client.send(command);
    return response;
  }

  // ============================================
  // 6. Unsubscribe
  // ============================================
  async unsubscribe(subscriptionArn: string) {
    const command = new UnsubscribeCommand({
      SubscriptionArn: subscriptionArn,
    });
    const response = await this.client.send(command);
    return response;
  }

  // ============================================
  // Production Use Cases
  // ============================================

  // Order Confirmation Notification
  async sendOrderConfirmation(orderId: string) {
    const subject = "Order Confirmation";
    const message = `Thank you for your order! Your order ID is ${orderId}.`;
    return this.publishMessage(subject, message, {
      orderType: "confirmation",
      priority: "high",
    });
  }

  // Shipping Update Notification
  async sendShippingUpdate(orderId: string, status: string) {
    const subject = "Shipping Update";
    const message = `Your order ID ${orderId} is now ${status}.`;
    return this.publishMessage(subject, message, { type: "shipping" });
  }

  //   system alert notification
  async sendSystemAlert(alertMessage: string) {
    const subject = "System Alert";
    const message = `Alert: ${alertMessage}`;
    return this.publishMessage(subject, message, {
      alertType: "system",
      priority: "critical",
    });
  }

  // User Registration Welcome
  async sendWelcomeMessage(userName: string, userEmail: string) {
    const subject = "Welcome to Our Service!";
    const message = `Hello ${userName}, welcome to our service! We're glad to have you on board. Your account (${userEmail}) has been successfully created.`;
    return this.publishMessage(subject, message, {
      userType: "new",
      engagement: "welcome",
    });
  }
}
