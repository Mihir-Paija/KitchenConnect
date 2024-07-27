import { Schema, model } from "mongoose";

const addressSchema = Schema(
  {
    coordinates: {
      latitude: {
        type: Number,
        required: [true, "Please enter your latitude"],
      },
      longitude: {
        type: Number,
        required: [true, "Please enter your longitude"],
      },
    },
  },
  { timestamps: true }
);

const customerSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },

    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "This email address is already exist"],
    },

    mobile: {
      type: String,
      required: [true, "Please enter Mobile Number"],
      // unique: [true, "This mobile number is already exist"],
    },

    password: {
      type: String,
      required: [true, "Please create your password"],
    },

    city: {
      type: String,
      required: [true, "Please enter your city"],
    },

    notificationTokens: [
      {
        type: String,
        // Ensure that each token is unique within the array if desired
        unique: true,
      },
    ],

    address: addressSchema,
  },
  { timestamps: true }
);

const customer = model("customer", customerSchema);

export default customer;
