import Subscriber from "../../models/subscriberModel.js";
import tiffins from "../../models/tiffinModel.js";
import subscription from "../../models/subscriptionModel.js";
import mongoose from "mongoose";
import { formatDate } from "../../utils/formatDate.js";
import subscriptionOrder from "../../models/subscriptionOrderModel.js";
import generateOrdersForSubscription from "../../utils/subscriptionOrderGenerator.js";
export const getSubscribers = async (req, res) => {
  try {
    const userID = req.user._id;

    const tiffin = await tiffins.find({
      providerID: new mongoose.Types.ObjectId(userID),
    });

    const tiffinMap = new Map();

    for (const value of tiffin) {
      const id = value._id.toString();
      tiffinMap.set(id, [value.name, value.tiffinType]);
    }

    const subscriptions = await subscription.find({
      providerID: new mongoose.Types.ObjectId(userID),
    });
    const subMap = new Map();

    for (const value of subscriptions) {
      for (const title of value.subscriptions) {
        const id = title._id.toString();
        subMap.set(id, title.title);
      }
    }

    const subscribers = await Subscriber.find({
      kitchenID: new mongoose.Types.ObjectId(userID),
    });

    const active = [];
    const pending = [];
    const completed = [];
    const tiffinSet = new Set();
    tiffinSet.add("All");

    if (subscribers) {
      const currentDate = new Date();

            for (const subscriber of subscribers) {

                const subscriberData = subscriber._doc
                
                const formattedSubscriber = {
                  ...subscriberData,
                  title: subMap.get(subscriberData.subscriptionID.toString()),

          tiffinName: tiffinMap.get(subscriberData.tiffinID.toString())[0],
          tiffinType: tiffinMap.get(subscriberData.tiffinID.toString())[1],
          formattedStartDate: formatDate(new Date(subscriberData.startDate)),
          formattedEndDate: formatDate(new Date(subscriberData.endDate)),
        };

        if (
          (new Date(subscriberData.endDate) < currentDate &&
            subscriberData.subscriptionStatus.status === "Current") ||
          subscriberData.subscriptionStatus.status === "Cancelled"
        ) {
          completed.push(formattedSubscriber);
        } else if (subscriberData.subscriptionStatus.status === "Current") {
          tiffinSet.add(formattedSubscriber.tiffinName);
          active.push(formattedSubscriber);
        } else if (subscriberData.subscriptionStatus.status === "Pending") {
          pending.push(formattedSubscriber);
        }
      }
    }

    const tiffinArray = Array.from(tiffinSet);

    return res.status(200).send({
      active: active,
      pending: pending,
      completed: completed,
      tiffins: tiffinArray,
    });
  } catch (error) {
    console.log("Error in Fetching Subscribers ", error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};

export const decideStatus = async (req, res) => {
  try {
    const { subscriptionID } = req.params;
    console.log(subscriptionID);
    const { status, comments } = req.body;
    console.log(status);

    const current = await Subscriber.findById(subscriptionID);

    if (!current)
      return res.status(404).send({
        message: `Subscriber Not Found`,
      });

    current._doc.subscriptionStatus.status = status;
    current._doc.subscriptionStatus.comments = comments ? comments : null;
    await current.save();

    if (status == "Current") {
      const startDate = current.startDate;
      const endDate = current.endDate;
      const subOrders = generateOrdersForSubscription(
        startDate,
        endDate,
        subscriptionID
      );
      //   console.log(subOrders);
      const SubscriptionOrder = await subscriptionOrder.create({
        subscriptionID,
        subOrders,
      });
      //   console.log(SubscriptionOrder);
    }

    return res.status(200).send({
      message: `Updated Successfully`,
    });
  } catch (error) {
    console.log("Error in Deciding Status ", error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};
