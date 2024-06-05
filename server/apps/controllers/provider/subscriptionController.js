import subscription from "../../models/subscriptionModel.js";
import mongoose from 'mongoose';

export const getSubscriptions = async(req, res) =>{
    try {
        const userID = req.user._id;
        const {tiffinID} = req.params

        const currentSubs = await subscription.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if(currentSubs.length !== 0)
            return res.status(200).json(currentSubs[0].subscriptions)

        return res.status(200).json([]);

    } catch (error) {
        console.log("Error in Fetching Subscriptions - Provider ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const addSubscription = async(req, res) =>{
try {
    const userID = req.user._id;
    const {tiffinID} = req.params

    const {title, price, days} = req.body;

    if(!title || !price || !days){
        console.log("Fields")
        return res.status(400).send({
            message: "Please Enter All Required Fields"
        })
    }
    const details ={
        title,
        price,
        days
    }

    let newSub = {
        providerID: userID,
        tiffinID,
        subscriptions: []
    }

    let subExists = await subscription.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

    if (subExists.length === 0) {
        newSub.subscriptions.push(details);
        const addedSub = await subscription.create(newSub)
        if (addedSub) {
            return res.status(201).send({
                message: "Subscription Added Successfully"
            })
        }

        return res.status(500).send({
            message: "Subscription Not Added!"
        })

    }

    
    let titleExists = subExists[0].subscriptions.find(item => item.title === title);

    if(titleExists)
        return res.status(400).send({
        message: `Subscription Already Exists!`
    })

    subExists[0].subscriptions.push(details)

    const updatedSub = subExists[0].save();

    if(updatedSub)
        return res.status(201).send({
            message: `Subscription Added Succesfully`
        })

    return res.status(500).send({
        message: "Couldn't Add Subscription! Please Try Again"
    })

} catch (error) {
    console.log("Error in Adding Subscription", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
}
}