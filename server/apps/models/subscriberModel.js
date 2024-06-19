import mongoose, { mongo } from 'mongoose';
const { Schema, model } = mongoose;


const priceSchema = new mongoose.Schema({
    tiffinPrice: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        required: true,
    },

    deliveryCharge: {
        type: Number,
        required: true,
    },
})

const daySchema = new mongoose.Schema({
    remaining: {
        type: [Date],
        required: true,
    },

    completed: {
        type: [Date]
    },

    customerOut: {
        type: [Date]
    },

    providerOut: {
        type: [Date]
    }
});


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

    subscriptionID:{
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true, 
    },

    noOfTiffins: { 
        type: Number, 
        required: true 
    },

    status: { 
        type: String,
        enum: ['Current', 'Pending', 'Rejected', 'Cancelled'],
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

    days: {
        type: daySchema,
    },

    lowerLimit:{
        type: Number,
        required: true
    },

    price: {
        type: priceSchema,
        required: true
    },

    delivery: { 
        type: Boolean, 
        required: true 
    },
    
    address: { 
        type: String, 
    },

    cancelDate:{
        type: Date
    },

    comments: {
        type: String
    }
    
}, { timestamps: true })

const subscriber = mongoose.model('Subscriber', subscriberSchema);

export default subscriber;