import { Mongoose } from "mongoose";
import history from "../../models/historyModel.js";
import order from "../../models/orderModel.js";
import Subscriber from "../../models/subscriberModel.js";

export const getHistory = async(req, res) =>{
    try{
        const userID = req.user._id;

        const subscribers = await Subscriber.find({kitchenID: new Mongoose.Types.ObjectID(userID)})
        const subscriberMap = new Map()

        for(const value of subscribers){
            const subID = value._doc._id.toString()
            subscriberMap.set(subID, value._doc)
        }
        
        const totalHistory = [];
        const subscriberHistory = await history.find({kitchenID: new Mongoose.Types.ObjectID(userID), status: 'Delivered'})

        const orderHistory = await order.find({kitchenID: new Mongoose.Types.ObjectID(userID), status: 'Completed'})

        for(const value of subscriberHistory){
            const subscriberData = subscriberMap.get(value._doc.orderID)
            const formattedSubscriber = {
                ...subscriberData,
                ...value,
                title: 'Subscription'
            }
            totalHistory.push(formattedSubscriber)
        }

        for(const value of orderHistory){
            const orderData = value._doc
            const formattedOrder = {
                ...orderData,
                title: 'One Time'
            }
            totalHistory.push(formattedOrder)
        }

        totalHistory.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))

        return res.status(200).json(totalHistory)

        
    }catch(error){
        console.log('Error in Fetching History ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}