import city from "../../models/cityModel";

export const addCity = async (req, res) => {
  try {
    const { cityName } = req.body;
    const City = await city.create({ city: cityName });
    if (City) {
      return res.status(201).send({
        message: `city created successfully`,
      });
    }
  } catch (error) {
    console.log("Error in adding city  - Customer ", error);
    return res.status(500).send({
      error: "Internal Server Error in adding city",
      message: error.message,
    });
  }
};
