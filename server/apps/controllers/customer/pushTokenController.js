import customer from "../../models/customerModel.js";

export const pushToken = async (req, res) => {
  try {
    const { customerID } = req.params;
    const { token } = req.body;
    if (!customerID) {
      return res.status(400).json({ message: "customerID is required" });
    }
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const Customer = await customer.findById(customerID);

    if (!Customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    Customer.fcmToken = token;
    await Customer.save();

    console.log("Updated customer:", Customer);
    return res.status(200).json({ message: "Token stored successfully" });
  } catch (error) {
    console.log("Error in post notification token  - Customer ", error.message);
    return res.status(500).send({
      error: "Internal Server Error in get kitchen feedback customer",
      message: error.message,
    });
  }
};
