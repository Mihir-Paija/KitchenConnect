import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },

    id: {
      type: String,
      required: [true, "Please Enter Your ID"],
      unique: [true, "This ID already exists"],
    },

    password: {
      type: String,
      required: [true, "Please Create A Password"],
    },

    role: {
        type: String,
        enum: ['Owner', 'Reader'],
        required: [true, 'Please Enter Role']
    },
  },
  { timestamps: true }
);

const admin = mongoose.model("Admin", adminSchema);

export default admin;
