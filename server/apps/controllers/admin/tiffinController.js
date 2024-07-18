import provider from "../../models/providerModel.js";
import tiffin from "../../models/tiffinModel.js";
import { ObjectId } from "mongodb";
export const getTiffinList = async (req, res) => {
  try {
    // console.log(req.params);
    const { providerID } = req.params;

    if (!providerID)
      return res.status(404).send({
        message: `Invalid URL : providerID missing`,
      });

    //   Check if kitchenId is a valid ObjectId
    if (!ObjectId.isValid(providerID)) {
      return res.status(400).json({
        error: "Invalid providerID",
        message: "The provided providerID is not a valid MongoDB ObjectId",
      });
    }

    const tiffins = await tiffin.find({ providerID });
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
