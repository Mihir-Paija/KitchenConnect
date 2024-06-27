import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const historySchema = new Schema({
    orderID: {
        type: Schema.Types.ObjectId,
        ref: 'Subscriber',
        required: [true, "Please enter the order ID"],
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
