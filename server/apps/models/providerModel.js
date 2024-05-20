import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const providerSchema = new Schema({

	name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },

    email: {
      type: String,
      required: [true, "Please Enter Your Email-ID"],
      unique: [true, "This email address is already exists"],
    },

    mobile: {
      type: String,
      required: [true, "Please Enter Your Mobile Number"],
      // unique: [true, "This mobile number is already exist"],
    },

    password: {
      type: String,
      required: [true, "Please Create A Password"],
    },

    kitchenName: {
    	type: String,
    	required: [true, "Please Enter Your Business Name"]
    },

    city: {
    	type: String,
    	required: [true, "Please Enter Your Business City"]
    },
 
}, { timestamps: true } );

const provider = mongoose.model('Provider', providerSchema);

export default provider;