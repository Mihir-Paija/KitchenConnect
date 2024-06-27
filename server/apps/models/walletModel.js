import mongoose from "mongoose";
const { Schema, model } = mongoose;

const walletSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: [true, "Please enter the user ID"],
    },
    
    firstName:{
        type: String,
        required: [true, "Please enter the first name"],

    },

    lastName:{
        type: String,
        required: [true, "Please enter the last name"],

    },

    amount:{
        type: Number,
        default: 0,
    },

    pin:{
        type: String,
        required: [true, "Please Create A PIN"],
    }, 

    cardNumber: {
        type: String
    }
}, {timestamps: true})

const wallet = mongoose.model("Wallet", walletSchema);

export default wallet;