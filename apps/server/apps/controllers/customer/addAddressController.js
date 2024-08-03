import customer from "../../models/customerModel.js";
import { ObjectId } from "mongodb";

// Route to add address to a customer
export const addAddress = async (req, res) => {
  const { customerID } = req.params;
  const { flatNumber, apartment, street, city, pinCode } = req.body;

  try {
    const Customer = await customer.findById(customerID);
    if (!Customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newAddress = {
      flatNumber,
      apartment,
      street,
      city,
      pinCode,
    };

    Customer.address.push(newAddress);
    await Customer.save();

    res.status(200).json({ message: "Address added successfully", Customer });
  } catch (err) {
    console.log("Error in post address  - Customer ", err.message);
    return res.status(500).send({
      error: "Internal Server Error in post address customer",
      message: err.message,
    });
  }
};
