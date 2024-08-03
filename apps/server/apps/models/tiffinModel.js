import mongoose from "mongoose";
const { Schema, model } = mongoose;

const deliverySchema = new mongoose.Schema({
  availability: {
    type: Boolean,
    required: [true, "Please Enter Delivery Availabillity"],
  },

  deliveryCharge: {
    type: Number,
  },

  deliveryTime: {
    type: String,
  },
});

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

const tiffinSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter The Tiffin Name"],
    },

    providerID: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    shortDescription: {
      type: String,
      required: [true, "Please Enter A Short Description of your Business"],
    },

    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg", "Swaminarayan", "Jain", "Vegan"],
      required: [true, "Please Enter The Food Type"],
    },

    priceDetails: {
      type: priceDetailsSchema,
      required: [true, "Please Add price Details"],
    },

    tiffinType: {
      type: String,
      enum: ["Lunch", "Dinner"],
      required: [true, "Please Enter The Tiffin Type"],
    },

    time: {
      type: String,
      required: [true, "Please Enter The Time Tiffin Will Be Ready"],
    },

    rating: {
      type: Number,
      default: null,
    },

    ratingsize: {
      type: Number,
      default: 0,
    },

    deliveryDetails: {
      type: deliverySchema,
      required: [true, "Please Add Delivery Details"],
    },

    providePacking: {
      type: Boolean,
      required: [true, "Please Mention if you will provide packing or not"],
    },

    packingCharge: {
      type: Number,
      default: null,
    },

    deactivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const tiffins = mongoose.model("Tiffins", tiffinSchema);

export default tiffins;
