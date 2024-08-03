import { string } from "joi";
import mongoose, { Schema, Model, SchemaType } from "mongoose";

const citySchema = Schema(
  {
    city: {
      type: string,
      required: true,
    },

    //   state: {
    //     type: string,
    //     required: true,
    //   },
  },
  { timestamps: true }
);

const city = mongoose.model("City", citySchema);

export default city;
