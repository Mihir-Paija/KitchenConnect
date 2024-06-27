import mongoose from "mongoose";
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
    orderID: {
        type: Schema.Types.ObjectId,
        required: [true, "Please enter the order ID"],
    },

    payerID: {
        type: Schema.Types.ObjectId,
        required: [true, "Please enter the payer ID"],
    },

    recieverID: {
        type: Schema.Types.ObjectId,
        required: [true, "Please enter the reciever ID"],
    },

    amountPaid:{
        type: Number,
        required: [true, "Please enter the amount paid"],
    },

    amountRecieved:{
        type: Number,
        required: [true, "Please enter the amount recieved"],
    }
    
}, {timestamps: true})

const transaction = mongoose.model("Transaction", transactionSchema);

export default transaction;