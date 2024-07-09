import mongoose from "mongoose";
const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    orderID: {
      type: Schema.Types.ObjectId,
      // Assuming orderID is optional
    },

    walletID: {
      // This can act as either payerID or receiverID
      type: Schema.Types.ObjectId,
      required: [true, "Please enter the wallet ID"],
    },

    counterpartyID: {
      // Optional, used only for transfers
      type: Schema.Types.ObjectId,
      // Assuming counterpartyID is optional
    },

    amount: {
      type: Number,
      required: [true, "Please enter the amount"],
    },

    transactionType: {
      type: String,
      enum: [
        "SubscriptionOrder",
        "SingleOrder",
        "Withdraw",
        "Deposit",
        "Transfer",
      ],
      required: [true, "Please specify the transaction type"],
    },
  },
  { timestamps: true }
);

const transaction = mongoose.model("Transaction", transactionSchema);

export default transaction;
