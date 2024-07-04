import provider from "../../models/providerModel.js";
import subscriber from "../../models/subscriberModel.js";
import tiffins from "../../models/tiffinModel.js";
import subscription from "../../models/subscriptionModel.js";
import { sendNotification } from "../provider/subscriptionController.js";
import subscriberJoiValidate from "../../utils/validations/customer/subscriber.js";
import subscriptionOrder from "../../models/subscriptionOrderModel.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// Helper function to generate an array of dates between two dates
const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate);
  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const subscribe = async (req, res) => {
  try {
    const { customerID, kitchenID, tiffinID, subscriptionID } = req.params;

    if (!customerID || !kitchenID || !tiffinID || !subscriptionID)
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
    if (!ObjectId.isValid(subscriptionID)) {
      return res.status(400).json({
        error: "Invalid subscriptionID",
        message: "The provided subscriptionID is not a valid MongoDB ObjectId",
      });
    }

    //validate req.body
    const valid = await subscriberJoiValidate(req.body);

    const {
      subscriberFirstName,
      subscriberLastName,
      startDate,
      endDate,
      wantDelivery,
      noOfTiffins,
      address,
      subscriptionStatus,
      price,
      customerPaymentBreakdown,
      kitchenPaymentBreakdown,
    } = req.body;

    const dayStarted = new Date(startDate);
    const dayEnded = new Date(endDate);

    dayStarted.setHours(0, 0, 0, 0);
    dayEnded.setHours(0, 0, 0, 0);

    const daysRemaining = getDatesInRange(dayStarted, dayEnded);

    const subscriberData = {
      customerID,
      kitchenID,
      tiffinID,
      subscriptionID,
      subscriberFirstName,
      subscriberLastName,
      startDate: dayStarted,
      endDate: dayEnded,
      wantDelivery,
      noOfTiffins,
      address,
      subscriptionStatus: {
        ...subscriptionStatus,
        daysRemaining,
      },
      price,
      customerPaymentBreakdown,
      kitchenPaymentBreakdown,
    };

    const newSubscriber = await subscriber.create(subscriberData);
    if (newSubscriber) {
      process.nextTick(async () => {
        try {
          const kitchen = await provider.findById(kitchenID);
          if (kitchen && kitchen.fcmToken) {
            const heading = "New Subscription Request";
            const body = `You have received a subscription request from ${subscriberFirstName} ${subscriberLastName}!`;
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

      console.log(newSubscriber);
      return res.status(201).send({
        message: `Sent Subscription Request`,
      });
    }

    return res.status(500).send({
      message: `Couldn't Subscribe!`,
    });
  } catch (error) {
    console.log("Error in Subscribing  - Customer ", error);
    return res.status(500).send({
      error: "Internal Server Error in POST subscription customer",
      message: error.message,
    });
  }
};

export const subscriptionDetailsGet = async (req, res) => {
  try {
    const { subscriptionID } = req.params;

    if (!subscriptionID)
      return res.status(404).send({
        message: `Invalid URL`,
      });

    //   Check if _id is a valid ObjectId

    if (!ObjectId.isValid(subscriptionID)) {
      return res.status(400).json({
        error: "Invalid subscriptionID",
        message: "The provided subscriptionID is not a valid MongoDB ObjectId",
      });
    }

    const subscriptionData = await subscriber.findById(subscriptionID);
    if (!subscriptionData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Subscription not found",
      });
    }

    const subscriptionPlanData = await subscription.findOne(
      { "subscriptions._id": subscriptionData.subscriptionID },
      { "subscriptions.$": 1 }
    );
    if (!subscriptionPlanData) {
      return res.status(404).json({
        error: "Not Found",
        message: "subscriptionPlanData not found",
      });
    }

    const kitchenData = await provider.findById(
      subscriptionData.kitchenID,
      "name email mobile kitchenName address"
    );
    if (!kitchenData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Kitchen not found",
      });
    }

    const tiffinData = await tiffins.findById(
      subscriptionData.tiffinID,
      "name foodType tiffinType time deliveryDetails"
    );
    if (!tiffinData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Tiffin not found",
      });
    }

    const subscriptionDetails = {
      Subscription: subscriptionData,
      SubscriptionPlan: subscriptionPlanData.subscriptions[0],
      Kitchen: kitchenData,
      Tiffin: tiffinData,
    };
    return res.status(200).json(subscriptionDetails);
  } catch (error) {
    console.log("Error in Fetching Subscribers ", error);
    return res.status(500).send({
      error: `Internal Server Error in GET subscriptionDetails`,
      message: error.message,
    });
  }
};

export const subscriptionsGet = async (req, res) => {
  try {
    const { customerID } = req.params;

    if (!customerID)
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

    const subscriptionsList = await subscriber.find({ customerID });
    if (!subscriptionsList) {
      return res.status(404).json({
        error: "Not Found",
        message: "subscriptionsList not found",
      });
    }

    const detailedSubscriptionsList = await Promise.all(
      subscriptionsList.map(async (sub) => {
        const subscriptionPlanData = await subscription.findOne(
          { "subscriptions._id": sub.subscriptionID },
          { "subscriptions.$": 1 }
        );
        if (!subscriptionPlanData) {
          return res.status(404).json({
            error: "Not Found",
            message: "subscriptionPlanData not found",
          });
        }

        const kitchenData = await provider.findById(
          sub.kitchenID,
          "kitchenName"
        );
        if (!kitchenData) {
          return res.status(404).json({
            error: "Not Found",
            message: "Kitchen not found",
          });
        }

        const tiffinData = await tiffins.findById(
          sub.tiffinID,
          "name foodType tiffinType time deliveryDetails.deliveryTime"
        );
        if (!tiffinData) {
          return res.status(404).json({
            error: "Not Found",
            message: "Tiffin not found",
          });
        }

        // console.log(sub);

        return {
          // subscriptionPlan: {
          //   subscriptionPlanTittle: subscriptionPlanData.title,
          // },
          subscriptionPlanData: subscriptionPlanData.subscriptions[0],
          // Subscription: subscriptionData,
          Subscription: {
            _id: sub._id,
            subscriberFirstName: sub.subscriberFirstName,
            subscriberLastName: sub.subscriberLastName,
            startDate: sub.startDate,
            endDate: sub.endDate,
            noOfTiffins: sub.noOfTiffins,
            wantDelivery: sub.wantDelivery,
            subscriptionStatus: sub.subscriptionStatus.status,
            orderDate: sub.createdAt,
          },
          Kitchen: kitchenData,
          Tiffin: tiffinData,
        };
      })
    );
    // console.log(detailedSubscriptionsList);
    return res.status(200).json(detailedSubscriptionsList);

    // return res.status(200).json(subscriptionsList);
  } catch (error) {
    console.log("Error in Fetching subscriptionsList ", error);

    return res.status(500).send({
      error: `Internal Server Error in GET subscriptionsList`,
      message: error.message,
    });
  }
};

export const subscriptionOrderGet = async (req, res) => {
  try {
    const { subscriptionID } = req.params;

    if (!subscriptionID)
      return res.status(404).send({
        message: `Invalid URL`,
      });

    //   Check if _id is a valid ObjectId

    if (!ObjectId.isValid(subscriptionID)) {
      return res.status(400).json({
        error: "Invalid subscriptionID",
        message: "The provided subscriptionID is not a valid MongoDB ObjectId",
      });
    }

    const subscriptionOrders = await subscriptionOrder.findOne({
      subscriptionID,
    });
    // console.log(subscriptionOrders);
    if (!subscriptionOrders) {
      return res.status(200).json({
        // error: "Not Found",
        // message: "subscriptionOrders not found",
      });
    }

    // console.log(detailedSubscriptionsList);
    return res.status(200).json(subscriptionOrders);

    // return res.status(200).json(subscriptionsList);
  } catch (error) {
    console.log("Error in Fetching subscriptionOrders ", error);

    return res.status(500).send({
      error: `Internal Server Error in GET subscriptionOrders`,
      message: error.message,
    });
  }
};
