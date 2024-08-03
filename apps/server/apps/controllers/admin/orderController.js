import provider from "../../models/providerModel.js";
import subscriber from "../../models/subscriberModel.js";
import tiffins from "../../models/tiffinModel.js";
import subscription from "../../models/subscriptionModel.js";
import order from "../../models/orderModel.js";
import { sendNotification } from "../provider/subscriptionController.js";
import orderJoiValidate from "../../utils/validations/customer/order.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import customer from "../../models/customerModel.js";

export const orderListAdminGet = async (req, res) => {
  try {
    // console.log("hi");
    const { customerEmail } = req.params;
    if (!customerEmail) {
      return res.status(404).send({
        error: "Invalid URL",
        message: "customerEmail missing in pramas",
      });
    }

    const Customer = await customer.findOne({ email: customerEmail });

    if (!Customer) {
      return res.status(404).json({
        error: "Not Found",
        message: "customer not found",
      });
    }

    const orderList = await order
      .find(
        { customerID: Customer._id },
        "kitchenID tiffinID status noOfTiffins wantDelivery comments orderDate customerPaymentBreakdown.total"
      )
      .sort({ orderDate: -1 });
    if (!orderList) {
      return res.status(404).json({
        error: "Not Found",
        message: "orderList not found",
      });
    }

    const detailedOrderList = await Promise.all(
      orderList.map(async (order) => {
        const kitchenData = await provider.findById(
          order.kitchenID,
          "kitchenName"
        );
        if (!kitchenData) {
          console.error("Kitchen not found");
          return res.status(404).json({
            error: "Not Found",
            message: "Kitchen not found",
          });
        }

        const tiffinData = await tiffins.findById(
          order.tiffinID,
          "name foodType tiffinType time deliveryDetails.deliveryTime"
        );
        if (!tiffinData) {
          console.error("Tiffin not found");
          return res.status(404).json({
            error: "Not Found",
            message: "Tiffin not found",
          });
        }

        return {
          order,
          Kitchen: kitchenData,
          Tiffin: tiffinData,
        };
      })
    );

    // console.log(detailedOrderList);
    return res.status(200).json(detailedOrderList);
  } catch (error) {
    console.log("Error in Fetching orderList ", error);

    return res.status(500).send({
      error: `Internal Server Error in GET orderList`,
      message: error.message,
    });
  }
};

export const orderDetailsAdminGet = async (req, res) => {
  try {
    const { orderID } = req.params;
    if (!orderID) {
      return res.status(404).send({
        error: "Invalid URL",
        message: "orderID missing in pramas",
      });
    }

    //   Check if _id is a valid ObjectId

    if (!ObjectId.isValid(orderID)) {
      return res.status(400).json({
        error: "Invalid orderID",
        message: "The provided orderID is not a valid MongoDB ObjectId",
      });
    }

    const orderData = await order.findById(orderID);

    if (!orderData) {
      return res.status(404).json({
        error: "Not Found",
        message: "orderData not found",
      });
    }

    const kitchenData = await provider.findById(
      orderData.kitchenID,
      "email mobile kitchenName address"
    );
    if (!kitchenData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Kitchen not found",
      });
    }

    const tiffinData = await tiffins.findById(
      orderData.tiffinID,
      "name foodType tiffinType time deliveryDetails.deliveryTime"
    );
    if (!tiffinData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Tiffin not found",
      });
    }

    const orderDetails = {
      order: orderData,
      Kitchen: kitchenData,
      Tiffin: tiffinData,
    };
    return res.status(200).json(orderDetails);
  } catch (error) {
    console.log("Error in Fetching orderDetails ", error);

    return res.status(500).send({
      error: `Internal Server Error in GET orderDetails`,
      message: error.message,
    });
  }
};
