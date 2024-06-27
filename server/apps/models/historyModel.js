import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const historySchema = new Schema({
    orderID: { //_id of subscriber
        type: Schema.Types.ObjectId,
        ref: 'Subscriber',
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


    orderDate:{
        type: Date,
        required: [true, 'Please Enter Order Date'],
    },

    status:{
        type: String,
        enum: ['Delivered', 'Upcoming', 'Opt Out']
    },

    otp:{
        type: String,
    },

    amount:{
        type: Number,
    }


}, {timestamps: true})

const history = mongoose.model("History", historySchema);

export default history;
