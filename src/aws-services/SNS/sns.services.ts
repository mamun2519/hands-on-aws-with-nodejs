import SNSService from "./config";

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

export const SNSServices = {
  sendWelcomeMessage,
};
