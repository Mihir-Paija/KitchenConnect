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

const tiffinSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter The Tiffin Name"],
    },

    providerID: {
      type: Schema.Types.ObjectId,
      ref: "Provider", // Referencing the Provider model
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

    price: {
      type: Number,
      default: 0,
      required: [true, "Please Enter The Tiffin Price"],
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

    deliveryDetails: {
      type: deliverySchema,
      required: [true, "Please Add Delivery Details"],
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
