import { ObjectId } from "mongodb";
import tiffin from "../../models/tiffinModel.js";

export const tiffinGet = async (req, res) => {
  const { kitchenId } = req.params;

  //   Check if kitchenId is a valid ObjectId
  if (!ObjectId.isValid(kitchenId)) {
    return res.status(400).json({
      error: "Invalid kitchenId",
      message: "The provided kitchenId is not a valid MongoDB ObjectId",
    });
  }

  try {
    const tiffins = await tiffin.find({ providerID: kitchenId });

    /* sort this before sending response by Rating : High to Low when Rating will be introduced */

    if (tiffins.length > 0) {
      return res.status(200).json(tiffins);
    } else {
      return res.status(200).json([]); //{ message: "There is no Tiffin Available for this Kitchen" }
    }
  } catch (error) {
    console.log("Internal Server Error in GET Tiffin\n" + error);
    return res.status(500).send({
      error: "Internal Server Error in GET Tiffin",
      message: error.message,
    });
  }
};
