import mongoose from "mongoose";
const { Schema, model } = mongoose;
const priceDetailsSchema = new mongoose.Schema({
  price: {
    type: Number,
    default: 0,
    required: [true, "Please Enter The Tiffin Price"],
  },

  commission: {
    type: Number,
    default: 0,
    required: [true, "commision missing"],
  },

  kitchenDiscount: {
    type: Number,
    default: 0,
    required: [true, "kitchenDiscount missing"],
  },

  serviceDiscount: {
    type: Number,
    default: 0,
    required: [true, "serviceDiscount missing"],
  },
});

const detailsSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["Weekly", "Fortnightly", "Monthly"],
    required: [true, "Please Enter Title"],
  },

  priceDetails: {
    type: priceDetailsSchema,
    required: [true, "Please Add price Details"],
  },

  discount: {
    type: Number,
    default: 0,
  },

  deliveryCharge: {
    type: Number,
    default: 0,
  },

  days: {
    type: Number,
    required: [true, "Please Enter Number of Days"],
  },

  description: {
    type: String,
    required: false,
  },

  activated: {
    type: Boolean,
    default: true,
  },
});

const subscriptionSchema = new Schema(
  {
    providerID: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    tiffinID: {
      type: Schema.Types.ObjectId,
      ref: "Tiffins",
      required: true,
    },

    subscriptions: [detailsSchema],
  },
  { timestamps: true }
);

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;
