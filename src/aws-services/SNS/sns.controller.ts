import { Request, Response } from "express";
import { SNSServices } from "./sns.services";

const addSubscriberToTopic = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await SNSServices.addSubscriberToTopic(email);
    res.status(200).json({ message: "Subscriber added successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to add subscriber", error });
  }
};

const unsubscribeFromTopic = async (req: Request, res: Response) => {
  try {
    const { subscriptionArn } = req.body;
    const result = await SNSServices.unsubscribeFromTopic(subscriptionArn);
    res.status(200).json({ message: "Unsubscribed successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to unsubscribe", error });
  }
};

const sendWelcomeMessage = async (req: Request, res: Response) => {
  try {
    const { userName, userEmail } = req.body;
    const result = await SNSServices.sendWelcomeMessage(userName, userEmail);
    res.status(200).json({ message: "Welcome message sent", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to send welcome message", error });
  }
};

const sendShippingUpdate = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const result = await SNSServices.sendShippingUpdate(orderId, status);
    res.status(200).json({ message: "Shipping update sent", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to send shipping update", error });
  }
};

const sendOrderConfirmation = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const result = await SNSServices.sendOrderConfirmation(orderId);
    res.status(200).json({ message: "Order confirmation sent", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send order confirmation", error });
  }
};

const sendSystemAlert = async (req: Request, res: Response) => {
  try {
    const { alertMessage } = req.body;
    const result = await SNSServices.sendSystemAlert(alertMessage);
    res.status(200).json({ message: "System alert sent", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to send system alert", error });
  }
};
const s;

export const SNSController = {
  addSubscriberToTopic,
  unsubscribeFromTopic,
  sendWelcomeMessage,
  sendShippingUpdate,
  sendOrderConfirmation,
  sendSystemAlert,
};
