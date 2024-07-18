import provider from '../../models/providerModel.js'
import tiffin from '../../models/tiffinModel.js'
import subscription from "../../models/subscriptionModel.js";
import Subscriber from '../../models/subscriberModel.js';
import subscriptionOrder from "../../models/subscriptionOrderModel.js";
import mongoose from 'mongoose';

export const getSubscriptionDetails = async(req, res) =>{
    try {
        const {subID} = req.body;

        if(!subID)
            return res.status(400).send({
                message: `Please Enter ID`
        })

        const subscriberDetails = await Subscriber.findById(subID)
        if(!subscriberDetails)
            return res.status(400).send({
                message: `Subscription Doesn't Exist`
            })
        
        const providerDetails = await provider.findById(subscriberDetails.kitchenID)
        const tiffinDetails = await tiffin.findById(subscriberDetails.tiffinID);
        const subscriptionDetails = await subscription.findOne({providerID: new mongoose.Types.ObjectId(subscriberDetails.kitchenID), tiffinID: new mongoose.Types.ObjectId(subscriberDetails.tiffinID)})

        const specificSub = subscriptionDetails.subscriptions.find(item => item._id = subscriberDetails.subscriptionID)

        const status = subscriberDetails.subscriptionStatus.daysRemaining.length === 0? 'Completed' : subscriberDetails.subscriptionStatus.status

        const toSend = {
            customerName: subscriberDetails.subscriberFirstName + ' ' + subscriberDetails.subscriberLastName,
            providerName: providerDetails.kitchenName,
            subscription: specificSub.title,
            tiffinName: tiffinDetails.name,
            tiffinType: tiffinDetails.tiffinType,
            noOfTiffins: subscriberDetails.noOfTiffins,
            startDate: subscriberDetails.startDate,
            endDate: subscriberDetails.endDate,
            status,
        }

        return res.status(200).json(toSend)

    } catch (error) {
        console.log('Error in Fetching Subscription Details ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}

export const getSubOrders = async(req, res) =>{
    try {
        const {subID} = req.body;

        if(!subID)
            return res.status(400).send({
                message: `Please Enter ID`
        })

        const subOrders = await subscriptionOrder.findOne({subscriptionID: new mongoose.Types.ObjectId(subID)})
        if(!subOrders)
            return res.status(400).send({
                message: `No Orders`
            })
        
        const toSend = subOrders.subOrders

        return res.status(200).json(toSend)

    } catch (error) {
        console.log('Error in Fetching Sub Orders ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}
