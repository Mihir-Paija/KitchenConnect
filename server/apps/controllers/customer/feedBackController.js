import customer from "../../models/customerModel.js";
import feedBack from "../../models/feedBackModel.js";
import provider from "../../models/providerModel.js";
import tiffins from "../../models/tiffinModel.js";
import feedBackJoiValidate from "../../utils/validations/customer/feedBackValidation.js";
import { ObjectId } from "mongodb";

export const feedBackPost = async (req, res) => {
  try {
    const { customerID, kitchenID, tiffinID } = req.params;
    if (!customerID || !kitchenID || !tiffinID) {
      return res.status(404).send({
        error: "Invalid URL",
        message: "customerID or kitchenID or tiffinID missing",
      });
    }
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
    const valid = await feedBackJoiValidate(req.body);
    const { rate, review } = req.body;
    const feedBackData = {
      customerID,
      kitchenID,
      tiffinID,
      rate,
      review,
    };
    const newFeedBack = await feedBack.create(feedBackData);

    const tiffinData = await tiffins.findById(tiffinID, "rating ratingsize");
    if (!tiffinData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Tiffin not found",
      });
    }

    tiffinData.rating = parseFloat(
      (
        (tiffinData.rating * tiffinData.ratingsize + rate) /
        (tiffinData.ratingsize + 1)
      ).toFixed(1)
    );

    tiffinData.ratingsize = tiffinData.ratingsize + 1;

    await tiffinData.save();

    const kitchenData = await provider.findById(kitchenID, "rating ratingsize");
    if (!kitchenData) {
      return res.status(404).json({
        error: "Not Found",
        message: "Kitchen not found",
      });
    }

    kitchenData.rating = parseFloat(
      (
        (kitchenData.rating * kitchenData.ratingsize + rate) /
        (kitchenData.ratingsize + 1)
      ).toFixed(1)
    );

    kitchenData.ratingsize = kitchenData.ratingsize + 1;

    await kitchenData.save();

    if (newFeedBack) {
      console.log(newFeedBack);
      return res.status(200).send({
        message: "FeedBack added Succesfully",
      });
    }
  } catch (error) {
    console.log("Error in post feedback  - Customer ", error.message);
    return res.status(500).send({
      error: "Internal Server Error in POST feedback customer",
      message: error.message,
    });
  }
};

export const feedBackKitchenGET = async (req, res) => {
  try {
    const { kitchenID } = req.params;
    if (!kitchenID) {
      return res.status(404).send({
        error: "Invalid URL",
        message: "customerID or kitchenID or tiffinID missing",
      });
    }
    //   Check if _id is a valid ObjectId
    // if (!ObjectId.isValid(customerID)) {
    //   return res.status(400).json({
    //     error: "Invalid customerID",
    //     message: "The provided customerID is not a valid MongoDB ObjectId",
    //   });
    // }
    if (!ObjectId.isValid(kitchenID)) {
      return res.status(400).json({
        error: "Invalid kitchenID",
        message: "The provided kitchenID is not a valid MongoDB ObjectId",
      });
    }

    const feedBackList = await feedBack.find({ kitchenID });

    const detailedFeedBackList = await Promise.all(
      feedBackList.map(async (feedBack) => {
        const customerData = await customer.findById(
          feedBack.customerID,
          "name"
        );
        if (!customerData) {
          return res.status(404).json({
            error: "Not Found",
            message: "customerData not found",
          });
        }

        return {
          feedBack,
          customerDetail: customerData,
        };
      })
    );

    if (detailedFeedBackList) {
      // console.log(feedBacks);
      return res.status(200).json(detailedFeedBackList);
    }
  } catch (error) {
    console.log("Error in get kitchen feedback  - Customer ", error.message);
    return res.status(500).send({
      error: "Internal Server Error in get kitchen feedback customer",
      message: error.message,
    });
  }
};

export const feedBackTiffinGET = async (req, res) => {
  try {
    const {kitchenID, tiffinID } = req.params;
    if (!kitchenID || !tiffinID) {
      return res.status(404).send({
        error: "Invalid URL",
        message: "customerID or kitchenID or tiffinID missing",
      });
    }
    //   Check if _id is a valid ObjectId
    // if (!ObjectId.isValid(customerID)) {
    //   return res.status(400).json({
    //     error: "Invalid customerID",
    //     message: "The provided customerID is not a valid MongoDB ObjectId",
    //   });
    // }
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

    const feedBackList = await feedBack.find({ kitchenID, tiffinID });

    const detailedFeedBackList = await Promise.all(
      feedBackList.map(async (feedBack) => {
        const customerData = await customer.findById(
          feedBack.customerID,
          "name"
        );
        if (!customerData) {
          return res.status(404).json({
            error: "Not Found",
            message: "customerData not found",
          });
        }

        return {
          feedBack,
          customerDetail: customerData,
        };
      })
    );

    if (detailedFeedBackList) {
      // console.log(feedBacks);
      return res.status(200).json(detailedFeedBackList);
    }
  } catch (error) {
    console.log("Error in get kitchen feedback  - Customer ", error.message);
    return res.status(500).send({
      error: "Internal Server Error in get kitchen feedback customer",
      message: error.message,
    });
  }
};
