import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const historySchema = new Schema({
    orderID: { //_id of subscriber or one time order
        type: Schema.Types.ObjectId,
        required: [true, "Please enter the order ID"],
    },
    kitchenID:{
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, "Please enter the kitchen ID"],
    },
    customerID:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, "Please enter the customer ID"],
    },
    customerName:{
        type: 'String',
        required: [true, 'Please Enter Customer Name']
    },

    amountPaid:{
        type: Number,
        required: [true, "Please enter the amount paid"],
    },

    amountReceived:{
        type: Number,
        required: [true, "Please enter the amount received"],
    },


}, {timestamps: true})

const history = mongoose.model("History", historySchema);

export default history;