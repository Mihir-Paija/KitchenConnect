import provider from "../../models/providerModel.js";
import subscriber from "../../models/subscriberModel.js";
import tiffins from "../../models/tiffinModel.js";
import subscription from "../../models/subscriptionModel.js";
import order from "../../models/orderModel.js";
import { sendNotification } from "../provider/subscriptionController.js";
import orderJoiValidate from "../../utils/validations/customer/order.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const placeOrder = async (req, res) => {
  try {
    const { customerID, kitchenID, tiffinID } = req.params;

    if (!customerID || !kitchenID || !tiffinID)
      return res.status(404).send({
        message: `Invalid URL`,
      });

    //   Check if _id is a valid ObjectId
    if (!ObjectId.isValid(customerID)) {
      return res.status(400).json({
        error: "Invalid customerID",
        message: "The provided customerID is not a valid MongoDB ObjectId",
      });
    }
    if (!ObjectId.isValid(kitchenID)) {
      return res.status(400).json({
        error: "Invalid kitchenID",
        message: "The provided kitchenID is not a valid MongoDB ObjectId",
      });
    }
    if (!ObjectId.isValid(tiffinID)) {
      return res.status(400).json({
        error: "Invalid tiffinID",
        message: "The provided tiffinID is not a valid MongoDB ObjectId",
      });
    }

    //validate req.body
    const valid = await orderJoiValidate(req.body);

    const {
      customerName,
      orderDate,
      wantDelivery,
      noOfTiffins,
      address,
      status,
      price,
      customerPaymentBreakdown,
      kitchenPaymentBreakdown,
    } = req.body;

    const orderData = {
      customerID,
      kitchenID,
      tiffinID,
      customerName,
      orderDate,
      wantDelivery,
      noOfTiffins,
      address,
      status,
      price,
      customerPaymentBreakdown,
      kitchenPaymentBreakdown,
    };

    const newOrder = await order.create(orderData);
    if (newOrder) {
      process.nextTick(async () => {
        try {
          const kitchen = await provider.findById(kitchenID);
          if (kitchen && kitchen.fcmToken) {
            const heading = "New Order Request";
            const body = `You have received a order request from ${customerName}!`;
            await sendNotification(kitchen.fcmToken, heading, body);
            console.log("Notification sent successfully");
          } else {
            console.error("Kitchen or FCM token not found");
          }
        } catch (error) {
          console.error(
            "Error fetching kitchen or sending notification:",
            error
          );
        }
      });

      console.log(newOrder);
      return res.status(201).send({
        message: `Sent order Request`,
      });
    }

    return res.status(500).send({
      message: `Couldn't place order!`,
    });
  } catch (error) {
    console.log("Error in placing order  - Customer ", error);
    return res.status(500).send({
      error: "Internal Server Error in POST place order customer",
      message: error.message,
    });
  }
};
