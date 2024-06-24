import Subscriber from '../../models/subscriberModel.js'
import tiffins from '../../models/tiffinModel.js';
import order from '../../models/orderModel.js';
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {

    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for(const value of tiffin){
          const id = value._id.toString() 
          tiffinMap.set(id, [value.name, value.tiffinType])
        }

        const subscribers = await Subscriber.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const lunch = [];
        const dinner = [];
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

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
            const tiffinName = tiffinMap.get(tiffinID.toString())[0]
            const tiffinType = tiffinMap.get(tiffinID.toString())[1]

            subscriber._doc.tiffinName = tiffinName
            subscriber._doc.tiffinType = tiffinType
            subscriber._doc.title = 'Subscription'
            subscriber._doc.providerOut =  false
            subscriber._doc.customerOut = false
            const out = false;

            if (new Date(startDate) <= currentDate && currentDate <= new Date(endDate) && status === 'Current') {

                if(subscriber._doc.days.customerOut.includes(currentDate)){
                    subscriber._doc.customerOut = true
                    out = true;
                }

                if(subscriber._doc.days.providerOut.includes(currentDate)){
                    subscriber._doc.providerOut = true
                    out = true;
                }

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                const index = findTiffinIndex(arr, tiffinName);

                if (index === -1) {
                    insertInSortedOrder(arr, {
                        tiffinName: tiffinName,
                        number: out ? 0 : noOfTiffins,
                        orders: [subscriber]
                    });
                } else {
                    arr[index].number += out ? 0 : noOfTiffins;
                    arr[index].orders.push(subscriber._doc);
                    const [updatedItem] = arr.splice(index, 1);
                    insertInSortedOrder(arr, updatedItem);
                }
            }
        };

        const orders = await order.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const toDate = currentDate.setHours(0, 0, 0, 0);

        for(const value of orders){
            if(value.createdAt >= toDate && value.status === 'Accepted'){
                const tiffinID = value.tiffinID.toString()
                const tiffinName = tiffinMap.get(tiffinID)[0]
                const tiffinType = tiffinMap.get(tiffinID)[1]
                const noOfTiffins = value.noOfTiffins
                const newValue = {
                    ...value._doc,
                    tiffinName: tiffinName,
                    tiffinType: tiffinType,
                    title: 'One Time'

                }                

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                const index = findTiffinIndex(arr, tiffinName);

                if (index === -1) {
                    insertInSortedOrder(arr, {
                        tiffinName: tiffinName,
                        number: noOfTiffins,
                        orders: [newValue]
                    });
                } else {
                    arr[index].number += noOfTiffins;
                    arr[index].orders.push(newValue);
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

        for(const value of tiffin){
          const id = value._id.toString()
          tiffinMap.set(id, [value.name, value.tiffinType])
        } 

        const orders = await order.find({ providerID: new mongoose.Types.ObjectId(userID) })
        const currentDate = new Date()

        const toDate = currentDate.setHours(0, 0, 0, 0);
        const pendingOrders = []

        for(const value of orders){

            if(value.createdAt >= toDate && value.status === 'Pending'){
                const tiffinID = value.tiffinID.toString()
                const tiffinName = tiffinMap.get(tiffinID)[0]
                const tiffinType = tiffinMap.get(tiffinID)[1]
                const newValue = {
                    ...value._doc,
                    tiffinName: tiffinName,
                    tiffinType: tiffinType

                }
                console.log(newValue)
                pendingOrders.push(newValue)
            }
        }

        return res.status(200).send({
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

export const optOut = async(req, res) =>{
    try {
        const userID = req.user._id

        const orderSet = new Set();

        const {orders, type} = req.body;

        for (const order of orders)
            orderSet.add(order._id.toString())
        
        const subscribers = await Subscriber.find({ providerID: new mongoose.Types.ObjectId(userID) })
        const currentDate = newDate();
        currentDate.setHours(0,0,0,0)

        const bulkOperations = [];

        for(const subscriber of subscribers){
            const subscriberData = subscriber._doc
            const orderID = subscriberData._id.toString()
            if(orderSet.has(orderID)){
                subscriberData.days.providerOut.push(currentDate)
                subscriberData.days.remaining = subscriberData.days.remaining.filter(item => new Date(item) != currentDate())
                orderSet.delete(orderID)

                bulkOperations.push({
                    updateOne: {
                        filter: { _id: subscriberData._id },
                        update: { $set: { 'days.providerOut': subscriberData.days.providerOut, 'days.remaining': subscriberData.days.remaining } }
                    }
                });
            }
        }

        if (bulkOperations.length > 0) {
            try {
                const result = await Subscriber.bulkWrite(bulkOperations);
                console.log('Bulk update result:', result);
            } catch (error) {
                console.error('Error during bulk update:', error);
                return res.status(500).send({
                    message: `Couldn't Opt Out`
                })
            }
        }

        const oneTimeorders = await order.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const oneTimeOrdersBulkOperations = []
        for(const value of oneTimeorders){
            const orderID = value._id.toString()
            if(orderSet.has(orderID)){
                value.status = 'Rejected'
                value.comments = 'Provider Opted Out'
                orderSet.delete(orderID)

                oneTimeOrdersBulkOperations.push({
                    updateOne: {
                        filter: { _id: value._id },
                        update: { $set: { status: value.status, comments: value.comments } }
                    }
                });
            }
        }

        if (oneTimeOrdersBulkOperations.length > 0) {
            try {
                const result = await order.bulkWrite(oneTimeOrdersBulkOperations);
                console.log('One-time orders bulk update result:', result);
            } catch (error) {
                console.error('Error during one-time orders bulk update:', error);
                return res.status(500).send({
                    message: `Couldn't Opt Out`
                })
            }
        }

        //send socket to consumer to refresh

        return res.status(200).send({
            message: `Opt Out Successfull`
        })




    } catch (error) {
        console.log('Error in Opting Out ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        }) 
    }
}