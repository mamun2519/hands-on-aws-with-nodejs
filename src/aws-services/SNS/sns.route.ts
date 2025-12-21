import express from "express";
import { SNSController } from "./sns.controller";

const router = express.Router();

router.post("/subscribe", SNSController.addSubscriberToTopic);
router.post("/unsubscribe", SNSController.unsubscribeFromTopic);
router.post("/send-welcome", SNSController.sendWelcomeMessage);
router.post("/send-shipping-update", SNSController.sendShippingUpdate);
router.post("/send-order-confirmation", SNSController.sendOrderConfirmation);
router.post("/send-system-alert", SNSController.sendSystemAlert);

export default router;
