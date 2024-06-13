import subscriber from "../../models/subscriberModel.js";
import mongoose from 'mongoose';

export const getSubscribers = async (req, res) => {
    try {
        const userID = req.user._id;

        const subscribers = await subscriber.find({providerID: new mongoose.Types.ObjectId(userID)})

        if(subscribers){
            console.log(subscribers)
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