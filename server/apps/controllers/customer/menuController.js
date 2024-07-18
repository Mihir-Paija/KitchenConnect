import { ObjectId } from "mongodb";
import menu from "../../models/menuModel.js";

export const menuGet = async (req, res) => {
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
    const menus = kitchenID
      ? await menu.find({ providerID: kitchenID, tiffinID })
      : await menu.find({ tiffinID });

    if (menus.length > 0) {
      const menuList = menus[0].menu;
      return res.status(200).json(menus[0]);
    } else {
      return res.status(200).json({ menu: [] }); //{ message: "There is no menu Available for this tiffin" }
    }
  } catch (error) {
    console.log("Internal Server Error in GET Menu\n" + error);
    return res.status(500).send({
      error: "Internal Server Error in GET Menu",
      message: error.message,
    });
  }
};
