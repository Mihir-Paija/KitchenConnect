import { Schema, model } from "mongoose";

const customerSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter userName"],
    },

    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "This email address is already exist"],
    },

    mobile: {
      type: String,
      required: [true, "Please enter Mobile Number"],
      unique: [true, "This mobile number is already exist"],
    },

    password: {
      type: String,
      required: [true, "Please create your password"],
    },
  },
  { timestamps: true }
);

const customer = model("customer", customerSchema);

export default customer;
