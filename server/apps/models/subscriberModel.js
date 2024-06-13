import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subscriberSchema = new Schema({
    providerID: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },

    customerID: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },

    customerName: {
        type: String,
        required: true
    },
    
    tiffinID: { 
        type: Schema.Types.ObjectId,
        ref: 'Tiffins',
        required: true, 
    },

    tiffinName: { 
        type: String, 
        required: true 
    },

    tiffinType: {
        type: String,
        enum: ["Lunch", "Dinner"],
        required: true
    },

    subscriptionID:{
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true, 
    },

    title: {
        type: String,
        enum: ["Weekly", "Fortnightly", "Monthly"],
        required: true
    },

    noOfTiffins: { 
        type: Number, 
        required: true 
    },
 
    price: { 
        type: Number, 
        required: true 
    },

    version: { 
        type: Number, 
        default: 1,
    },

    accepted: { 
        type: Boolean, 
        default: false,
    },

    startDate: { 
        type: Date, 
        required: true 
    },

    endDate: { 
        type: Date, 
        required: true 
    },

    delivery: { 
        type: Boolean, 
        required: true 
    },
    
    address: { 
        type: String, 
    },

    pending:{
        type: Boolean,
        default: true
    },

    comments: {
        type: String
    }
    

}, { timestamps: true })

const subscriber = mongoose.model('Subscriber', subscriberSchema);

export default subscriber;