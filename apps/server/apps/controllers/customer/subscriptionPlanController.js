import subscription from "../../models/subscriptionModel.js";
import mongoose from "mongoose";
import { admin } from "../../utils/firebaseAdmin.js";
import axios from "axios";
import { ObjectId } from "mongodb";

export const subscriptionPlansGet = async (req, res) => {
  const { kitchenID, tiffinID } = req.params;

  //   Check if kitchenID is a valid ObjectId
  if (kitchenID && !ObjectId.isValid(kitchenID)) {
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

  try {
    const SubscriptionPlanData = kitchenID
      ? await subscription.find({
          providerID: kitchenID,
          tiffinID,
        })
      : await subscription.find({
          tiffinID,
        });

    if (SubscriptionPlanData.length > 0) {
      // Filter out only active subscriptions
      const filteredSubsData = SubscriptionPlanData.map((sub) => ({
        ...sub._doc,
        subscriptions: sub.subscriptions.filter(
          (subscription) => subscription.activated
        ),
      }));

      return res.status(200).json(filteredSubsData[0]);
    } else {
      return res.status(200).json({ subscriptions: [] }); //{ message: "There is no menu Available for this tiffin" }
    }
  } catch (error) {
    console.log("Error in Fetching Subscriptions - Customer ", error);
    return res.status(500).send({
      error: "Internal Server Error in GET subscription customer",
      message: error.message,
    });
  }
};
