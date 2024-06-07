import subscription from "../../models/subscriptionModel.js";
import mongoose from 'mongoose';

export const getSubscriptions = async(req, res) =>{
    try {
        const userID = req.user._id;
        const {tiffinID} = req.params

        const currentSubs = await subscription.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if(currentSubs.length !== 0){
            console.log(currentSubs[0].subscriptions)
            return res.status(200).json(currentSubs[0].subscriptions)
        }
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
    const {tiffinID} = req.params;

    console.log(userID);
    console.log(tiffinID);

    const {title, price, days, description} = req.body;

    if(!title || !price || !days || !description){
        return res.status(400).send({
            message: "Please Enter All Required Fields"
        })
    }
    const details ={
        title,
        price,
        days,
        description
    }

    let newSub = {
        providerID: userID,
        tiffinID,
        subscriptions: []
    }

    let subExists = await subscription.findOne({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

    if (subExists.length == 0) {
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

    let titleExists = subExists.subscriptions.find(item => item.title === title);

    if(titleExists){
        console.log(titleExists)
        return res.status(400).send({
        message: `Subscription Already Exists!`
    })
}


   const updatedSub = await subExists.save();
    // console.log(await subscription.findOne({ _id: subExists._id }))
    // const updatedSub = await subscription.updateOne(
    //     { _id: subExists._id },
    //     { $push: { subscriptions: details } }
    // );

    if(updatedSub){
        console.log(updatedSub)
        return res.status(201).send({
            message: `Subscription Added Succesfully`
        })
    }
    return res.status(500).send({
        message: "Couldn't Add Subscription! Please Try Again"
    })

} catch (error) {
    console.log("Error in Adding Subscription\n", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
}
}