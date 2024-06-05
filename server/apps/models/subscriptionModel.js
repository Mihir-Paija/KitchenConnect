import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const detailsSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Weekly", "Fortnightly", "Monthly"],
        required: [true, "Please Enter Title"],
        unique: [true, "This subscription already exists"],
    },

    price: {
        type: Number,
        required: [true, "Please Enter Price"]
    },

    days: {
        type: Number,
        required: [true, "Please Enter Number of Days"]
    },

    activated:{
        type: Boolean,
        default: true
    }

})

const subscriptionSchema = new Schema({
    providerID: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',  
        required: true
    },
    
    tiffinID: {
        type: Schema.Types.ObjectId,
        ref: 'Tiffins',  
        required: true
    },

    subscriptions: [detailsSchema],

}, { timestamps: true });

const subscription = mongoose.model('Subscription', subscriptionSchema);

export default  subscription;