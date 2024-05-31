import provider from "../../models/providerModel.js";
import {
  providerSignUpJoiValidation,
  providerLoginJoiValidation,
} from "../../utils/validations/provider/authValidation.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { signJwt, maxAge, verifyJwt } from "../../utils/jwt.js";

export const providerSignUpGet = async (req, res) => {
  try {
    return res.status(200).send({
      message: "Register on KitchenConnect to Expand Your Business",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const providerSignUpPost = async (req, res) => {
  try {
    const valid = await providerSignUpJoiValidation(req.body);
    if (!valid)
      return res.status(400).send({
        message: "Please Fill All Fields Properly",
      });
    const {
      name,
      email,
      mobile,
      password,
      city,
      businessName,
      shortDescription,
      flatNumber,
      street,
      landmark,
      provideDelivery,
    } = req.body;

    const user = await provider.findOne({ email });

    if (user) {
      return res.status(409).send({
        message: "User Already Exists! Please Login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const address = {
      flatNumber: flatNumber,
      street: street,
      landmark: landmark,
    };

    const newUser = {
      name,
      email,
      mobile,
      password: hashedPassword,
      city,
      kitchenName: businessName,
      shortDescription,
      address,
      provideDelivery,
    };

    const newProvider = await provider.create(newUser);

    if (newProvider) {
      console.log(newProvider);
      return res.status(201).send({
        message: "Registered Successfully!",
      });
    } else {
      console.log("Couldn't Register Provider");
      return res.status(500).send({
        message: "Couldn't Register! Please Try Again.",
      });
    }
  } catch (error) {
    console.log("Error in registering provider\n" + error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const providerLoginGet = async (req, res) => {
  try {
    return res.status(200).send({
      message: "Login to KitchenConnect",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const providerLoginPost = async (req, res) => {
  try {
    const valid = await providerLoginJoiValidation(req.body);
    if (!valid)
      return res.status(400).send({
        message: "Please Fill All Fields Properly",
      });

    const { email, password } = req.body;

    const user = await provider.findOne({ email });

    if (!user) {
      return res.status(409).send({
        message: "User Doesn't Exist! Please Register.",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        message: "Incorrect Details! Please Try Again",
      });
    }

    const tokenID = { userID: user._id };
    const token = signJwt(tokenID, process.env.JWT_SECRET);

    res.cookie("Welcome", token, { httpOnly: true, maxAge: maxAge * 1000 });

    return res.status(200).send({
      message: "Login Successful",
      authToken: token,
      authData: user,
    });
  } catch (error) {
    console.log("Error in Login provider\n" + error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const providerLogoutGet = async (req, res) => {
  try {
    res.clearCookie("Welcome");

    return res.status(200).send({
      message: `Logout Successful`,
    });
  } catch (error) {
    console.log("Error in logging out provider\n" + error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async(req, res) =>{
  try {
    const {id} = req.params
    if (!id) {
      return res.status(400).send({
          message: "Please Login"
      })
  }

    const userID = verifyJwt(id).decoded.userID;
    console.log(userID)

    if(!userID)
      return res.status(400).send({
        message: "Please Login"
    })

    const user = await provider.findById(userID)

    if(!user)
      return res.status(404).send({
    message: "Please Register"
  })

  console.log(user)

  return res.status(200).send({
    name: user.name,
    shortDescription: user.shortDescription
  })



  } catch (error) {
    console.log("Error in Get Profile-Provider ", error);
    return res.status(500).send({
      message: "Internal Server Error"
    })
    
  }
}
