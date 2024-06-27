import mongoose from "mongoose";
const { Schema, model } = mongoose;

const priceSchema = new mongoose.Schema({
    tiffinPrice: {
        type: Number,
        required: [true, "Please enter the tiffin price"],
    },
    deliveryCharge: {
        type: Number,
        required: [true, "Please enter the delivery charge"],
    },
    platformCommission: {
        type: Number,
        default: 0.1,
    },
    GST_on_tiffin: { type: Number, default: 0.05 },
    GST_on_service: { type: Number, default: 0.18 },
    serviceDiscount: { type: Number, default: null },
    kitchenDiscount: { type: Number, default: null },
});

const paymentBreakdownSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: [true, "Please enter the subscription price"],
    },
    platformCharge: {
        type: Number,
        required: [true, "Please enter the platform charge"],
    },
    tax: { type: Number, required: [true, "Please enter the tax amount"] },
    deliveryCharge: {
        type: Number,
        required: [true, "Please enter the delivery charge"],
    },
    discount: {
        type: Number,
        required: [true, "Please enter the discount amount"],
    },
    total: { type: Number, required: [true, "Please enter the total amount"] },

});

const orderSchema = new Schema(
    {
        customerID: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Please enter the customer ID"],
        },
        kitchenID: {
            type: Schema.Types.ObjectId,
            ref: "Kitchen",
            required: [true, "Please enter the kitchen ID"],
        },
        tiffinID: {
            type: Schema.Types.ObjectId,
            ref: "Tiffin",
            required: [true, "Please enter the tiffin ID"],
        },
        customerName: {
            type: String,
            required: [true, "Please enter customer name"],
        },
        wantDelivery: {
            type: Boolean,
            required: [true, "Please specify if delivery is wanted"],
        },
        noOfTiffins: {
            type: Number,
            required: [true, "Please enter the number of tiffins"],
        },
        address: { type: String, required: [true, "Please enter the address"] },
        status: {
            type: String,
            enum: ["Accepted", "Pending", "Rejected", "Completed"],
            required: [true, "Please enter the status"],
        },
        comments: { type: String, default: '' },
        price: {
            type: priceSchema,
            required: [true, "Please enter the price details"],
        },
        customerPaymentBreakdown: {
            type: paymentBreakdownSchema,
            required: [true, "Please enter the customer payment breakdown"],
        },
        kitchenPaymentBreakdown: {
            type: paymentBreakdownSchema,
            required: [true, "Please enter the kitchen payment breakdown"],
        },
    },
    { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);

export default order;
