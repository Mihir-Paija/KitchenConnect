import Joi from "joi";
import customer from "../../models/customerModel.js";
import Bcrypt from "bcrypt";
import { signJwt, maxAge } from "../../utils/jwt.js";

const loginGet = (req, res) => {
  res.status(200).json({ message: "you can login" });
};

const loginPost = async (req, res) => {
  try {
    //01. check req.body
    //define joi schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(13).required(),
    });

    //validate req.body with Joi schema
    const value = await schema.validateAsync(req.body);
    // console.log("value", value);

    const { email, password } = req.body;

    //02.check customer exist or not
    const Customer = await customer.findOne({ email });
    if (!Customer) {
      return res.status(400).json({
        error: "Invalid Credentials",
        message: "Email not found",
      });
    }

    //03.compare password
    const auth = await Bcrypt.compare(password, Customer.password);

    if (!auth) {
      return res.status(400).json({
        error: "Invalid Credentials",
        message: "Incorrect password",
      });
    }

    //create JWT token and pass it within cookie
    const tokenUser = { userID: Customer._id };
    const jwtToken = signJwt(tokenUser, process.env.JWT_SECRET);
    console.log("jwtToken : ", jwtToken);

    res.cookie("jwt", jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });

    console.log("new customer logged in : ", Customer.email);

    return res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: "Internal server error during signup",
      message: err.message,
    });
  }
};

export { loginGet, loginPost };
