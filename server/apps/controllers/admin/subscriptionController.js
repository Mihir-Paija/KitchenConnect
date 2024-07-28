import provider from "../../models/providerModel.js";
import tiffin from "../../models/tiffinModel.js";
import subscription from "../../models/subscriptionModel.js";
import Subscriber from "../../models/subscriberModel.js";
import subscriptionOrder from "../../models/subscriptionOrderModel.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const getSubscriptionDetails = async (req, res) => {
  try {
    const { subID } = req.body;

    if (!subID)
      return res.status(400).send({
        message: `Please Enter ID`,
      });

    const subscriberDetails = await Subscriber.findById(subID);
    if (!subscriberDetails)
      return res.status(400).send({
        message: `Subscription Doesn't Exist`,
      });

    const providerDetails = await provider.findById(
      subscriberDetails.kitchenID
    );
    const tiffinDetails = await tiffin.findById(subscriberDetails.tiffinID);
    const subscriptionDetails = await subscription.findOne({
      providerID: new mongoose.Types.ObjectId(subscriberDetails.kitchenID),
      tiffinID: new mongoose.Types.ObjectId(subscriberDetails.tiffinID),
    });

    const specificSub = subscriptionDetails.subscriptions.find(
      (item) => (item._id = subscriberDetails.subscriptionID)
    );

    const status =
      subscriberDetails.subscriptionStatus.daysRemaining.length === 0
        ? "Completed"
        : subscriberDetails.subscriptionStatus.status;

    const toSend = {
      customerName:
        subscriberDetails.subscriberFirstName +
        " " +
        subscriberDetails.subscriberLastName,
      providerName: providerDetails.kitchenName,
      providerID: subscriberDetails.kitchenID,
      subscription: specificSub.title,
      tiffinName: tiffinDetails.name,
      tiffinType: tiffinDetails.tiffinType,
      noOfTiffins: subscriberDetails.noOfTiffins,
      startDate: subscriberDetails.startDate,
      endDate: subscriberDetails.endDate,
      status,
      price: subscriberDetails.price,
      kitchenPaymentBreakdown: subscriberDetails.kitchenPaymentBreakdown,
      customerPaymentBreakdown: subscriberDetails.customerPaymentBreakdown,
    };

    return res.status(200).json(toSend);
  } catch (error) {
    console.log("Error in Fetching Subscription Details ", error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};

export const getSubOrders = async (req, res) => {
  try {
    const { subID } = req.body;

    if (!subID)
      return res.status(400).send({
        message: `Please Enter ID`,
      });

    const subOrders = await subscriptionOrder.findOne({
      subscriptionID: new mongoose.Types.ObjectId(subID),
    });
    if (!subOrders)
      return res.status(400).send({
        message: `No Orders`,
      });

    const toSend = subOrders.subOrders;

    return res.status(200).json(toSend);
  } catch (error) {
    console.log("Error in Fetching Sub Orders ", error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};

export const getSubscriptionsList = async (req, res) => {
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

    const subscriptionsList = await Subscriber.find({ customerID });
    if (!subscriptionsList) {
      return res.status(200).json([]);
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
          "kitchenName email"
        );
        if (!kitchenData) {
          return res.status(404).json({
            error: "Not Found",
            message: "Kitchen not found",
          });
        }

        const tiffinData = await tiffin.findById(
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
            cancelDate: sub.subscriptionStatus.cancelDate || null,
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
