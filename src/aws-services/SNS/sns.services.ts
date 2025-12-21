import SNS from "./config";

const sendEmailUsingSNS = async (
  subject: string,
  message: string,
  recipientEmail: string
) => {
  const params = {
    Subject: subject,
    Message: message,
    TopicArn: config.aws.sns.topicArn ?? "",
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Promotional",
      },
    },
  };

  const result = await SNS.publish(params).promise();

  return result;
};

export const SNSService = {
  sendEmailUsingSNS,
};
