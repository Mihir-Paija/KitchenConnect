import customer from "../../models/customerModel.js";

export const getCustomerProfile = async (req, res) => {
  try {
    const { customerID } = req.params;

    const user = await customer.findById(customerID);
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log("Error In Updating Personal Details ", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const editPersonalDetails = async (req, res) => {
  try {
    const { customerID } = req.params;
    const { name } = req.body;
    const user = await customer.findById(customerID);
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    user.name = name;

    const updatedUser = await user.save();

    if (updatedUser)
      return res.status(200).send({
        message: "Details Updated Succesfully",
      });

    return res.status(500).send({
      message: "Could not Update Details",
    });
  } catch (error) {
    console.log("Error In Updating Personal Details ", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
