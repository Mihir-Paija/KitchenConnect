import mongoose, { Schema, Model, SchemaType } from "mongoose";

const feedBackSchema = Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    kitchenID: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    tiffinID: {
      type: Schema.Types.ObjectId,
      ref: "Tiffins",
      required: true,
    },

    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "Please Provide Rating"],
    },

    review: {
      type: String,
      required: [true, "Please Provide Review"],
    },
  },
  { timestamps: true }
);

const feedBack = mongoose.model("FeedBack", feedBackSchema);

export default feedBack;
