import SNSService from "./config";

const addSubscriberToTopic = async (email: string) => {
  const sns = new SNSService();
  const result = await sns.subscribeEmail(email);
  return result;
};

const unsubscribeFromTopic = async (subscriptionArn: string) => {
  const sns = new SNSService();
  const result = await sns.unsubscribe(subscriptionArn);
  return result;
};

const sendWelcomeMessage = async (userName: string, userEmail: string) => {
  const sns = new SNSService();
  const result = await sns.sendWelcomeMessage(userName, userEmail);
  return result;
};

const sendShippingUpdate = async (orderId: string, status: string) => {
  const sns = new SNSService();
  const result = await sns.sendShippingUpdate(orderId, status);
  return result;
};

const sendOrderConfirmation = async (orderId: string) => {
  const sns = new SNSService();
  const result = await sns.sendOrderConfirmation(orderId);
  return result;
};

const sendSystemAlert = async (alertMessage: string) => {
  const sns = new SNSService();
  const result = await sns.sendSystemAlert(alertMessage);
  return result;
};

export const SNSServices = {
  sendWelcomeMessage,
};
