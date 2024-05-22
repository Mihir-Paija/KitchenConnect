import provider from "../../models/providerModel.js";

export const kitchenGet = async (req, res) => {
  try {
    const kitchens = await provider.find();
    if (kitchens) {
      return res.status(200).json(kitchens);
    } else {
      return res.status(200).json({ message: "There is no kitchen near you" });
    }
  } catch (error) {
    console.log("Internal Server Error in GET Kitchen\n" + error);
    return res.status(500).send({
      error: "Internal Server Error in GET Kitchen",
      message: error.message,
    });
  }
};
