import provider from "../../models/providerModel.js";
import {
  providerSignUpJoiValidation,
  providerLoginJoiValidation,
} from "../../utils/validations/provider/authValidation.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { signJwt, maxAge, verifyJwt } from "../../utils/jwt.js";
import { notifyProvider } from "../../socket.js";

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
    const user = req.user

    return res.status(200).send(user)

   return res.status(200).send({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    city: user.city,
    kitchenName: user.kitchenName,
    delivery: user.provideDelivery,

   })



  } catch (error) {
    console.log("Error in Get Profile-Provider ", error);
    return res.status(500).send({
      message: "Internal Server Error"
    })
    
  }
}

export const sendStatus = async(req, res) =>{
  const userID = req.user._id;
  const {message} = req.body;
  await notifyProvider(userID, message)

  return res.status(200).send({
    message: `Message Sent`
  })
}

export const setFCMToken = async(req, res) =>{
    try {
      const userID = req.user._id;
      const {fcmToken} = req.body;

      const setToken = await provider.findByIdAndUpdate(
        userID,
        { $set: { fcmToken: fcmToken } }, 
        { new: true }                   
      );

      if(setToken){
        return res.status(200).send({
          message: `Token Set Successfully`
        })
      }
      
      return res.status(500).send({
        message: `Couldn't Set Token`
      })
      
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Couldn't Set Token`
      })
    }
}
