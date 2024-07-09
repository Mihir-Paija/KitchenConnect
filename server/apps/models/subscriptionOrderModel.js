import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subOrderSchema = new Schema(
  {
    orderDate: {
      type: Date,
      required: [true, "Please Enter Order Date"],
    },
    status: {
      type: String,
      enum: ["Completed", "Upcoming", "OptedOut"],
    },
    optedOutDate: {
      type: Date,
      default: null,
    },
    otp: {
      type: String,
    },
    amountPaid: {
      type: Number,
    },
    amountRecieved: {
      type: Number,
    },
  },
  { timestamps: true }
);

const subscriptionOrderSchema = new Schema(
  {
    subscriptionID: {
      //_id of subscriber
      type: Schema.Types.ObjectId,
      ref: "Subscriber",
      required: [true, "Please enter the order ID"],
    },

    subOrders: [subOrderSchema],
  },
  { timestamps: true }
);

const subscriptionOrder = mongoose.model(
  "subscriptionOrder",
  subscriptionOrderSchema
);

export default subscriptionOrder;
