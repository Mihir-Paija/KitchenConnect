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

const orderSchema = new Schema({
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

    noOfTiffins: { 
        type: Number, 
        required: true 
    },

    status: { 
        type: String,
        enum: ['Accepted', 'Pending', 'Rejected'],
        default: false,
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

    comments: {
        type: String
    }
    
}, { timestamps: true })

const order = mongoose.model('Order', orderSchema);

export default order;