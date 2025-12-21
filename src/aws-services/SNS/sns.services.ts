import SNSService from "./config";

const sendWelcomeMessage = async (userName: string, userEmail: string) => {
  const sns = new SNSService();
  const result = await sns.sendWelcomeMessage(userName, userEmail);
  return result;
};

export const SNSServices = {
  sendWelcomeMessage,
};
