import Joi from "joi";
import customer from "../../models/customerModel.js";
import Bcrypt from "bcrypt";

const signupGet = (req, res) => {
  res.status(200).json({ message: "you can signup" });
};

const signupPost = async (req, res) => {
  try {
    // console.log(req.body);

    /* 01. check if req.body is in required form using joi */
    //define joi schema
    const schema = Joi.object({
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string(),
      password: Joi.string().min(6).max(13).required(),
      //   city: Joi.string(),
    });

    //validate req.body
    const value = await schema.validateAsync(req.body);
    // console.log("value", value);

    const { email, password, userName, mobile } = req.body;

    /*02. check if email address already exist*/
    const user_exist = await customer.findOne({ email });
    if (user_exist) {
      console.log(
        "Customer already register with this email address",
        user_exist
      );
      return res
        .status(400)
        .send({ message: "Customer already register with this email address" });
    }

    //03. Hash password before save into DB
    const saltRound = 10;
    const salt = await Bcrypt.genSalt(saltRound);
    const hash_password = await Bcrypt.hash(password, salt);

    //04.create customer data to store in DB
    const userData = {
      userName,
      email,
      mobile,
      password: hash_password,
    };

    //06.store userdata to DB
    const Customer = await customer.create(userData);
    console.log(`New customer created ${Customer}`);
    if (Customer) console.log("user_id", Customer.id);

    return res.status(201).send({ message: "Your Account is created" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: "Internal server error during signup",
      message: err.message,
    });
  }
};
export { signupGet, signupPost };
