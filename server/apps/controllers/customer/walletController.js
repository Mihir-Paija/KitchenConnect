import wallet from "../../models/walletModel.js";
import transaction from "../../models/transactionModel.js";
import provider from "../../models/providerModel.js";
import customer from "../../models/customerModel.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import mongoose from "mongoose";
import { verifyJwt } from "../../utils/jwt.js";
import order from "../../models/orderModel.js";
import tiffins from "../../models/tiffinModel.js";

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

    const TransactionDetails = {
      walletID,
      amount,
      transactionType: "Deposit",
    };

    const Transaction = await transaction.create(TransactionDetails);

    console.log(Transaction);

    return res.status(200).send({
      message: `Moey added to wallet Succesfully`,
      walletDetails,
      Transaction,
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

    const TransactionDetails = {
      walletID,
      amount,
      transactionType: "Withdraw",
    };

    const Transaction = await transaction.create(TransactionDetails);

    console.log(Transaction);

    return res.status(200).send({
      message: `Money withdrew from wallet Succesfully`,
      walletDetails,
      Transaction,
    });
  } catch (error) {
    console.log("Error in withdrawing money from wallet ", error);
    return res.status(500).send({
      error: "Internal Server Error in withdrawing money from wallet customer",
      message: error.message,
    });
  }
};

export const transactionHistoryGet = async (req, res) => {
  try {
    const { walletID } = req.params;

    if (!walletID) {
      console.log("walletID is missing");
      res.status(400).json({
        error: "Invalid URL",
        message: "walletID is missing",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(walletID)) {
      console.log("The provided walletID is not a valid MongoDB ObjectId");
      return res.status(400).json({
        error: "Invalid walletID",
        message: "The provided walletID is not a valid MongoDB ObjectId",
      });
    }

    const TransactionList = await transaction
      .find({
        $or: [{ walletID: walletID }, { counterpartyID: walletID }],
      })
      .sort({ createdAt: -1 });

    if (!TransactionList) {
      res.status(200).json([]);
    }

    const detailedTransactionList = await Promise.all(
      TransactionList.map(async (transactionElement) => {
        if (transactionElement.counterpartyID && transactionElement.orderID) {
          const Order = await order.findById(
            transactionElement.orderID,
            "_id customerID kitchenID tiffinID"
          );
          if (!Order) {
            return res.status(404).json({
              error: "Not Found",
              message: "Order not found",
            });
          }

          const kitchenData = await provider.findById(
            Order.kitchenID,
            "kitchenName"
          );
          if (!kitchenData) {
            return res.status(404).json({
              error: "Not Found",
              message: "Kitchen not found",
            });
          }

          const tiffinData = await tiffins.findById(Order.tiffinID, "name");
          if (!tiffinData) {
            return res.status(404).json({
              error: "Not Found",
              message: "Tiffin not found",
            });
          }

          return {
            ...transactionElement.toObject(),
            Order,
            Kitchen: kitchenData,
            Tiffin: tiffinData,
          };
        } else {
          return transactionElement.toObject();
        }
      })
    );

    return res.status(200).json(detailedTransactionList);
  } catch (error) {
    console.log("Error fetching Transaction history ", error.message);
    return res.status(500).json({
      error: "Internal Server Error in fetching transaction history",
      message: error.message,
    });
  }
};
