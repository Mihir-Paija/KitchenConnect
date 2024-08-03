import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const item = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Please Provide Item Name"]
    },

    quantity: {
        type: Number,
        required: [true, "Please Provide Quantity"]
    },

    unit: {
        type: String,
        required: [true, "Please Provide Unit"]
    }
})

const menuDetails = new mongoose.Schema({

    day: {
        type: String,
        enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
        required: [true, "Please Enter The Day"],
        unique: [true, "This day already exists"],
    },

    items: [item]
});

const menuSchema = new Schema ({
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

    menu: [menuDetails]

}, {timestamps: true})

const menu = mongoose.model('Menu', menuSchema);

export default menu;