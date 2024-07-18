import customer from "../../models/customerModel.js";

export const getCustomerCount = async (req, res) => {
  try {
    const customers = await customer.find();

    const count = customers.length;

    return res.status(200).send({
      count: count,
    });
  } catch (error) {
    console.log(`Error in getting customer count `, error.message);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};

export const getCustomerDetails = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).send({
        message: "Please Enter Email!",
      });
    }

    const details = await customer.findOne({ email: email });
    if (!details)
      return res.status(200).send({
        message: `Customer Doesn't Exist`,
      });

    const toSend = {
      name: details.name,
      email: details.email,
      mobile: details.mobile,
      city: details.city,
    };

    return res.status(200).json(toSend);
  } catch (error) {
    console.log(`Error in getting customer count `, error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};
