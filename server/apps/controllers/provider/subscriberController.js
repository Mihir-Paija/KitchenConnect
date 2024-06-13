import subscriber from "../../models/subscriberModel.js";
import mongoose from 'mongoose';

export const getSubscribers = async (req, res) => {
    try {
        const userID = req.user._id;

        const subscribers = await subscriber.find({providerID: new mongoose.Types.ObjectId(userID)})

        if(subscribers){
            //console.log(subscribers)
            return res.status(200).json(subscribers)
            
        }

        return res.status(200).json([])
    } catch (error) {
        console.log('Error in Fetching Subscribers ', error);
        return res.status(500).send({
            messaeg: `Internal Server Error`
        })
    }
}

export const decideStatus = async(req, res) =>{
    try {
        const {subscriptionID} = req.params;
        console.log(subscriptionID)
        const {accepted, comments} = req.body

        const current = await subscriber.findById(subscriptionID)

        if(!current)
            return res.status(404).send({
                message: `Subscriber Not Found`
            })
        
        current.accepted = accepted;
        current.pending = false;
        current.comments = comments ? comments: null

        await current.save();

        return res.status(200).send({
            message: `Updated Successfully`
        })
    } catch (error) {
        console.log('Error in Deciding Status ', error);
        return res.status(500).send({
            messaeg: `Internal Server Error`
        })
    }
}