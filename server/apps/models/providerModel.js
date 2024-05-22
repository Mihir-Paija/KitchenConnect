import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const addressSchema = new mongoose.Schema({
    flatNumber: {
      type: String,
      required: [true, "Please Enter Flat Number"]
    },

    street: {
      type: String,
      required: [true, "Please Enter Street"]
    },

    landmark: {
      type: String,
      required: false
    }

});

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

    city: {
    	type: String,
    	required: [true, "Please Enter Your Business City"]
    },

    kitchenName: {
    	type: String,
    	required: [true, "Please Enter Your Business Name"]
    },

    shortDescription: {
      type: String,
      required: [true, "Please Enter A Short Description of your Business"]
    },

    address: [addressSchema],

    basePrice:{
      type: Number,
      default: 0,
    },

    provideDelivery:{
      type: Boolean,
      required: [true, "Please Enter Delivery Mode"]
    }

}, { timestamps: true } );

const provider = mongoose.model('Provider', providerSchema);

export default provider;