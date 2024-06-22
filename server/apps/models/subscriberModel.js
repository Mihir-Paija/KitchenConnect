import mongoose from "mongoose";
const { Schema, model } = mongoose;

const priceSchema = new mongoose.Schema({
  tiffinPrice: {
    type: Number,
    required: [true, "Please enter the tiffin price"],
  },
  deliveryCharge: {
    type: Number,
    required: [true, "Please enter the delivery charge"],
  },
  platformCommission: {
    type: Number,
    default: 0.1,
  },
  GST_on_tiffin: { type: Number, default: 0.05 },
  GST_on_service: { type: Number, default: 0.18 },
  serviceDiscount: { type: Number, default: null },
  kitchenDiscount: { type: Number, default: null },
  lowerLimit: {
    type: Number,
    required: [true, "Please enter the lower limit"],
  },
});

const subcriptionStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Current", "Pending", "Rejected", "Cancelled"],
    required: [true, "Please enter the status"],
  },
  daysRemaining: { type: [Date], default: [] },
  daysOptedOut: { type: [Date], default: [] },
  daysCompleted: { type: [Date], default: [] },
  cancelDate: { type: Date, default: null },
});

const paymentBreakdownSchema = new mongoose.Schema({
  subscriptionPrice: {
    type: Number,
    required: [true, "Please enter the subscription price"],
  },
  platformCharge: {
    type: Number,
    required: [true, "Please enter the platform charge"],
  },
  tax: { type: Number, required: [true, "Please enter the tax amount"] },
  deliveryCharge: {
    type: Number,
    required: [true, "Please enter the delivery charge"],
  },
  discount: {
    type: Number,
    required: [true, "Please enter the discount amount"],
  },
  total: { type: Number, required: [true, "Please enter the total amount"] },
  moneyTransferTillNow: { type: Number, default: 0 },
  perOrderPrice: {
    type: Number,
    required: [true, "Please enter the per-order price"],
  },
});

const subscriberSchema = new Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please enter the customer ID"],
    },
    kitchenID: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen",
      required: [true, "Please enter the kitchen ID"],
    },
    tiffinID: {
      type: Schema.Types.ObjectId,
      ref: "Tiffin",
      required: [true, "Please enter the tiffin ID"],
    },
    subscriptionID: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: [true, "Please enter the subscription ID"],
    },
    subscriberFirstName: {
      type: String,
      required: [true, "Please enter the subscriber's first name"],
    },
    subscriberLastName: {
      type: String,
      required: [true, "Please enter the subscriber's last name"],
    },
    startDate: { type: Date, required: [true, "Please enter the start date"] },
    endDate: { type: Date, required: [true, "Please enter the end date"] },
    wantDelivery: {
      type: Boolean,
      required: [true, "Please specify if delivery is wanted"],
    },
    noOfTiffins: {
      type: Number,
      required: [true, "Please enter the number of tiffins"],
    },
    address: { type: String, required: [true, "Please enter the address"] },
    subcriptionStatus: {
      type: subcriptionStatusSchema,
      required: [true, "Please enter the subscription status"],
    },
    price: {
      type: priceSchema,
      required: [true, "Please enter the price details"],
    },
    customerPaymentBreakdown: {
      type: paymentBreakdownSchema,
      required: [true, "Please enter the customer payment breakdown"],
    },
    kitchenPaymentBreakdown: {
      type: paymentBreakdownSchema,
      required: [true, "Please enter the kitchen payment breakdown"],
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
