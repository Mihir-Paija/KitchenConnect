import wallet from "../../models/walletModel.js";
import provider from "../../models/providerModel.js";
import customer from "../../models/customerModel.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import mongoose from "mongoose";
import { verifyJwt } from "../../utils/jwt.js";

export const getWalletCustomer = async (req, res) => {
  try {
    const { customerID } = req.params;

    // console.log(customerID)
    if (!customerID)
      return res.status(400).send({
        message: `Please Fill All Feilds`,
      });

    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      return res.status(400).json({
        error: "Invalid customerID",
        message: "The provided customerID is not a valid MongoDB ObjectId",
      });
    }

    const exists = await wallet.findOne({
      userID: customerID,
    });

    if (!exists) {
      return res.status(200).send({
        wallet: false,
      });
    }

    // console.log(exists);

    const walletDetails = {
      wallet: true,
      walletID: exists._id,
      userID: exists.userID,
      amount: exists.amount,
      firstName: exists.firstName,
      lastName: exists.lastName,
      cardNumber: exists.cardNumber,
    };

    return res.status(200).json(walletDetails);
  } catch (error) {
    console.log("Error in fetching wallet ", error);
    return res.status(500).send({
      error: "Internal Server Error in GET wallet customer",
      message: error.message,
    });
  }
};

export const createWalletCustomer = async (req, res) => {
  try {
    const { customerID } = req.params;

    // console.log(customerID)
    if (!customerID)
      return res.status(400).send({
        message: `Please Fill All Feilds`,
      });

    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      return res.status(400).json({
        error: "Invalid customerID",
        message: "The provided customerID is not a valid MongoDB ObjectId",
      });
    }

    const { firstName, lastName, PIN, type, cardNumber } = req.body;

    if (PIN.toString().length === 0 || !firstName || !lastName)
      return res.status(400).send({
        error: `Please Fill All Feilds`,
        // message: "hi",
      });

    let user;
    user = await customer.findById(customerID);

    if (!user)
      return res.status(400).send({
        message: `User Doesn't Exist`,
      });

    const exists = await wallet.findOne({
      userID: customerID,
    });

    if (exists) {
      return res.status(400).send({
        message: `Wallet already Exists`,
      });
    }

    const hashedPIN = await hashPassword(PIN);

    const newWallet = {
      userID: customerID,
      firstName,
      lastName,
      pin: hashedPIN,
      cardNumber: cardNumber || null,
    };

    const createWallet = await wallet.create(newWallet);

    if (createWallet)
      return res.status(201).send({
        message: `Wallet Created Succesfully`,
      });

    return res.status(500).send({
      message: `Couldn't Create Wallet`,
    });
  } catch (error) {
    console.log("Error in creating wallet ", error);
    return res.status(500).send({
      error: "Internal Server Error in create wallet customer",
      message: error.message,
    });
  }
};

export const addMoneyCustomer = async (req, res) => {
  try {
    const { walletID } = req.params;

    // console.log(customerID)
    if (!walletID)
      return res.status(400).send({
        message: `Please Fill All Feilds`,
      });

    if (!mongoose.Types.ObjectId.isValid(walletID)) {
      return res.status(400).json({
        error: "Invalid walletID",
        message: "The provided walletID is not a valid MongoDB ObjectId",
      });
    }

    const { PIN, type, amount } = req.body;

    if (PIN.toString().length === 0 || !amount)
      return res.status(400).send({
        error: `Please Fill All Feilds`,
        // message: "hi",
      });

    const walletDetails = await wallet.findById(walletID);

    if (!walletDetails)
      return res.status(400).send({
        message: `wallet Doesn't Exist`,
      });

    // console.log(walletDetails);
    const isMatch = await comparePassword(PIN, walletDetails.pin);

    if (!isMatch)
      return res.status(400).send({
        message: "Incorrect PIN",
      });

    // Update the wallet balance
    walletDetails.amount = parseFloat(
      (walletDetails.amount + amount).toFixed(2)
    );

    // console.log(walletDetails);

    // Save the updated wallet details
    await walletDetails.save();

    return res.status(200).send({
      message: `Moey added to wallet Succesfully`,
    });
  } catch (error) {
    console.log("Error in adding money into wallet ", error);
    return res.status(500).send({
      error: "Internal Server Error in adding money into wallet customer",
      message: error.message,
    });
  }
};

export const withdrawMoneyCustomer = async (req, res) => {
  try {
    const { walletID } = req.params;

    // console.log(customerID)
    if (!walletID)
      return res.status(400).send({
        message: `Please Fill All Feilds`,
      });

    if (!mongoose.Types.ObjectId.isValid(walletID)) {
      return res.status(400).json({
        error: "Invalid walletID",
        message: "The provided walletID is not a valid MongoDB ObjectId",
      });
    }

    const { PIN, type, amount } = req.body;

    if (PIN.toString().length === 0 || !amount)
      return res.status(400).send({
        error: `Please Fill All Feilds`,
        // message: "hi",
      });

    const walletDetails = await wallet.findById(walletID);

    if (!walletDetails)
      return res.status(400).send({
        message: `wallet Doesn't Exist`,
      });

    // console.log(walletDetails);
    const isMatch = await comparePassword(PIN, walletDetails.pin);

    if (!isMatch)
      return res.status(400).send({
        message: "Incorrect PIN",
      });

    if (walletDetails.amount - amount <= 100) {
      return res.status(400).send({
        error: "Invalid amount",
        message: "Minimum 100 rupee required in wallet",
      });
    }

    // Update the wallet balance
    walletDetails.amount = parseFloat(
      (walletDetails.amount - amount).toFixed(2)
    );

    // console.log(walletDetails);

    // Save the updated wallet details
    await walletDetails.save();

    return res.status(200).send({
      message: `Money withdrew from wallet Succesfully`,
    });
  } catch (error) {
    console.log("Error in withdrawing money from wallet ", error);
    return res.status(500).send({
      error: "Internal Server Error in withdrawing money from wallet customer",
      message: error.message,
    });
  }
};
