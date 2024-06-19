import subscriber from '../../models/subscriberModel.js'
import tiffins from '../../models/tiffinModel.js';
import order from '../../models/orderModel.js';
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {

    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for(value of tiffins){
          tiffinMap.set(value._id, [value.name, value.tiffinType])
        }

        const subscribers = await subscriber.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const lunch = [];
        const dinner = [];
        const currentDate = new Date()

        function findTiffinIndex(arr, tiffinName) {
            return arr.findIndex(item => item.tiffinName === tiffinName);
        }

        function insertInSortedOrder(arr, newItem) {
            let i = 0;
            while (i < arr.length && arr[i].number >= newItem.number) {
                i++;
            }
            arr.splice(i, 0, newItem);
        }

        for (const subscriber of subscribers) {
            const { tiffinID, noOfTiffins, startDate, endDate, status } = subscriber._doc;
            const tiffinName = tiffinMap.get(tiffinID)[0]
            const tiffinType = tiffinMap.get(tiffinID)[1]

            subscriber._doc.tiffinName = tiffinName
            subscriber._doc.tiffinType = tiffinType
            subscriber._doc.title = 'Subscription'

            if (new Date(startDate) <= currentDate && currentDate <= new Date(endDate) && status === 'Current') {

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                const index = findTiffinIndex(arr, tiffinName);

                if (index === -1) {
                    insertInSortedOrder(arr, {
                        tiffinName: tiffinName,
                        number: noOfTiffins,
                        subscribers: [subscriber]
                    });
                } else {
                    arr[index].number += noOfTiffins;
                    arr[index].subscribers.push(subscriber._doc);
                    const [updatedItem] = arr.splice(index, 1);
                    insertInSortedOrder(arr, updatedItem);
                }
            }
        };

        const orders = await order.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const toDate = currentDate.setHours(0, 0, 0, 0);

        for(value of orders){
            if(value.createdAt >= toDate && value.status === 'Accepted'){
                const tiffinID = value.tiffinID
                const tiffinName = tiffinMap.get(tiffinID)[0]
                const tiffinType = tiffinMap.get(tiffinID)[1]
                value.tiffinName = tiffinName
                value.tiffinType = tiffinType
                value.title = 'One Time'
                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                const index = findTiffinIndex(arr, tiffinName);

                if (index === -1) {
                    insertInSortedOrder(arr, {
                        tiffinName: tiffinName,
                        number: noOfTiffins,
                        subscribers: [subscriber]
                    });
                } else {
                    arr[index].number += noOfTiffins;
                    arr[index].subscribers.push(subscriber._doc);
                    const [updatedItem] = arr.splice(index, 1);
                    insertInSortedOrder(arr, updatedItem);
                }
            }

        }

        return res.status(200).send({
            lunch: lunch,
            dinner: dinner
        })

    } catch (error) {
        console.log('Error in Fetching Order ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}

export const getPendingOrders = async(req, res) =>{
    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for(value of tiffins){
          tiffinMap.set(value._id, [value.name, value.tiffinType])
        } 

        const orders = await order.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const toDate = currentDate.setHours(0, 0, 0, 0);
        const pendingOrders = []

        for(value of orders){
            if(value.createdAt >= toDate && value.status === 'Pending'){
                const tiffinID = value.tiffinID
                const tiffinName = tiffinMap.get(tiffinID)[0]
                const tiffinType = tiffinMap.get(tiffinID)[1]
                value.tiffinName = tiffinName
                value.tiffinType = tiffinType
                pendingOrders.push(value)
            }
        }

        return req.status(200).send({
            pendingOrders: pendingOrders
        })
    } catch (error) {
        console.log('Error in Fetching Pending Orders ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}


export const decideOrderStatus = async(req, res) =>{
    try {
        const userID = req.user._id;
        const {orderID} = req.params;

        const {status} = req.body

        const current = await order.findById(orderID)

        if (!current)
            return res.status(404).send({
                message: `Order Not Found`
            })

        current.status = status;

        await current.save();

        return res.status(200).send({
            message: `Updated Successfully`
        })

    } catch (error) {
        console.log('Error in Deciding Status - Orders ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }

}