import Subscriber from '../../models/subscriberModel.js'
import tiffins from '../../models/tiffinModel.js';
import order from '../../models/orderModel.js';
import wallet from '../../models/walletModel.js'
import mongoose, { Mongoose } from 'mongoose';
import transaction from '../../models/transactionModel.js';
import subscriptionOrder from '../../models/subscriptionOrderModel.js';
import history from '../../models/historyModel.js';

const isDateInArray = (array, date) => {
    return array.some(d => new Date(d).toISOString() === new Date(date).toISOString());
};

const completeTransaction = async (orderID, kitchenID, customerID, customerAmount, kitchenAmount, type) => {
    try {
        
        const adminWallet = await wallet.findById("669fa3176f5e2f1f9af996dd")
        const customerWallet = await wallet.findOne({ userID: new mongoose.Types.ObjectId(customerID) })

        if (!customerWallet) {
            return 0;
        }

        if (parseInt(customerWallet.amount, 10) < customerAmount)
            return 0;

        const providerWallet = await wallet.findOne({ userID: new mongoose.Types.ObjectId(kitchenID) })
        console.log(providerWallet)
        if (!providerWallet) {
            return 0;
        }

        customerWallet.amount -= customerAmount
        let updatedCustomerWallet = await customerWallet.save();

        if(!updatedCustomerWallet){
            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }

        adminWallet.amount += customerAmount
        let updatedAdminWallet = await adminWallet.save();
        updatedCustomerWallet = null;
        if(!updatedAdminWallet){
            while(!updatedCustomerWallet){
                customerWallet.amount += customerAmount;
                updatedCustomerWallet = await customerWallet.save();
            }

            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }

        const customerTransaction = {
            walletID: customerWallet._id,
            amount: customerAmount,
            transactionType: type === 'order' ? 'SingleOrder' : 'SubscriptionOrder',
            orderID,
        }
        const transaction1 = await transaction.create(customerTransaction);
        if(!transaction1){
            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }

        adminWallet.amount -= kitchenAmount
        updatedAdminWallet = await adminWallet.save();
        
        if(!updatedAdminWallet){
            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }

        providerWallet.amount += kitchenAmount
        let updatedProviderWallet = await providerWallet.save()

        if(!updatedProviderWallet){
            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }

        const kitchenTransaction = {
            walletID: providerWallet._id,
            amount: kitchenAmount,
            transactionType: type === 'order' ? 'SingleOrder' : 'SubscriptionOrder',
            orderID,
        }
        const transaction2 = await transaction.create(kitchenTransaction);
        if(!transaction2){
            console.log(`Couldn't Complete Transaction! Please Try Again`)
            return 0;
        }        

        return 1;

    } catch (error) {
        console.log('Error in Completing Transaction ', error)
        return 0;
    }
}


export const getOrders = async (req, res) => {

    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for (const value of tiffin) {
            const id = value._id.toString()
            tiffinMap.set(id, [value.name, value.tiffinType])
        }

        const subscribers = await Subscriber.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

        const lunch = [];
        const dinner = [];
        const lunchAdresses = [];
        const dinnerAdresses = [];
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        const updatedDate = currentDate.toISOString().replace('Z', '+00:00');

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
            const { tiffinID, noOfTiffins, startDate, endDate, subscriptionStatus } = subscriber._doc;
            const tiffinName = tiffinMap.get(tiffinID.toString())[0]
            const tiffinType = tiffinMap.get(tiffinID.toString())[1]

            const formattedSubscriber = {
                ...subscriber._doc,
                tiffinName: tiffinName,
                tiffinType: tiffinType,
                title: 'Subscription',
                providerOut: false,
                customerOut: false,
            }

            let out = false;

            if (new Date(startDate) <= currentDate && currentDate <= new Date(endDate) && subscriptionStatus.status === 'Current' && !isDateInArray(subscriptionStatus.daysCompleted, currentDate)) {

                if (isDateInArray(subscriptionStatus.daysOptedOut, currentDate)) {
                    formattedSubscriber.customerOut = true
                    out = true;
                }

                if (isDateInArray(subscriptionStatus.providerOptedOut, currentDate)) {
                    formattedSubscriber.providerOut = true
                    out = true;
                }

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                if (subscriber._doc.wantDelivery) {
                    tiffinType === 'Lunch' ? lunchAdresses.push(subscriber._doc.address) : dinnerAdresses(subscriber._doc.address)
                }

                const index = findTiffinIndex(arr, tiffinName);

                if (index === -1) {
                    insertInSortedOrder(arr, {
                        tiffinName: tiffinName,
                        number: out ? 0 : noOfTiffins,
                        orders: [formattedSubscriber]
                    });
                } else {
                    arr[index].number += out ? 0 : noOfTiffins;
                    arr[index].orders.push(formattedSubscriber);
                    const [updatedItem] = arr.splice(index, 1);
                    insertInSortedOrder(arr, updatedItem);
                }
            }
        };

        const orders = await order.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

        const toDate = currentDate.setHours(0, 0, 0, 0);

        for (const value of orders) {
            if (value.createdAt >= toDate && value.status === 'Accepted') {
                const tiffinID = value.tiffinID.toString()
                const tiffinName = tiffinMap.get(tiffinID)[0]
                const tiffinType = tiffinMap.get(tiffinID)[1]
                const noOfTiffins = value.noOfTiffins
                const newValue = {
                    ...value._doc,
                    tiffinName: tiffinName,
                    tiffinType: tiffinType,
                    title: 'One Time',
                    providerOut: false,
                    customerOut: false,

                }

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

                if (value._doc.wantDelivery) {
                    tiffinType === 'Lunch' ? lunchAdresses.push(value._doc.address) : dinnerAdresses(value._doc.address)
                }

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

        console.log(lunchAdresses)
        console.log(dinnerAdresses)
        return res.status(200).send({
            lunch: lunch,
            dinner: dinner,
            lunchAdresses: lunchAdresses,
            dinnerAdresses: dinnerAdresses,
        })

    } catch (error) {
        console.log('Error in Fetching Order ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}

export const getPendingOrders = async (req, res) => {
    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({ providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for (const value of tiffin) {
            const id = value._id.toString()
            tiffinMap.set(id, [value.name, value.tiffinType])
        }

        const orders = await order.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

        const currentDate = new Date()

        const toDate = currentDate.setHours(0, 0, 0, 0);
        const pendingOrders = []

        for (const value of orders) {

            if (value.createdAt >= toDate && value.status === 'Pending') {
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


export const decideOrderStatus = async (req, res) => {
    try {
        const userID = req.user._id;
        console.log(userID)
        const { orderID } = req.params;

        const { status } = req.body

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

export const optOut = async (req, res) => {
    try {
        const userID = req.user._id

        const orderSet = new Set();


        const { orders, type } = req.body;

        for (const order of orders) {
            for (const value of order.orders) {
                orderSet.add(value._id.toString())
            }
        }
        console.log(orderSet)

        const subscribers = await Subscriber.find({ kitchenID: new mongoose.Types.ObjectId(userID) })
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const currentDateString = currentDate.toISOString();

        const bulkSubscriberOperations = [];

        for (const subscriber of subscribers) {
            const subscriberData = subscriber._doc
            const orderID = subscriberData._id.toString()
            if (orderSet.has(orderID)) {
                const subOrders = await subscriptionOrder.findOne({subscriptionID: new mongoose.Types.ObjectId(subscriberData._id)})

                let todayOrder = subOrders.subOrders.find(item => new Date(item.orderDate).toISOString() === currentDateString)
                if(!todayOrder)
                    return res.status(400).send({
                        message: `Couldn't Opt Out!`
                    })
                todayOrder.status = "ProviderOut"

                subOrders.save();
                
                subscriberData.subscriptionStatus.providerOptedOut.push(currentDate)
                console.log(subscriberData.subscriptionStatus.daysRemaining)
                console.log(currentDate)
                subscriberData.subscriptionStatus.daysRemaining = subscriberData.subscriptionStatus.daysRemaining.filter(item => new Date(item).toISOString() !== currentDateString)
                //orderSet.delete(orderID)

                bulkSubscriberOperations.push({
                    updateOne: {
                        filter: { _id: subscriberData._id },
                        update: { $set: { 'subscriptionStatus.providerOptedOut': subscriberData.subscriptionStatus.providerOptedOut, 'subscriptionStatus.daysRemaining': subscriberData.subscriptionStatus.daysRemaining } }
                    }
                });
            }
        }


        if (bulkSubscriberOperations.length > 0) {
            try {
                const result = await Subscriber.bulkWrite(bulkSubscriberOperations);
                console.log('Bulk update result:', result);
            } catch (error) {
                console.error('Error during bulk update:', error);
                return res.status(500).send({
                    message: `Couldn't Opt Out`
                })
            }
        }

        const oneTimeorders = await order.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

        const oneTimeOrdersBulkOperations = []
        for (const value of oneTimeorders) {
            const orderID = value._id.toString()

            if (orderSet.has(orderID)) {

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

export const sendOTP = async (req, res) => {
    try {
        const userID = req.user._id
        const { otp, order } = req.body
        console.log(otp)
        const customerID = order.customerID;
        console.log(customerID)

        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        const currentDateString = currentDate.toISOString()

        const orders = await subscriptionOrder.findOne({ subscriptionID: order._id })
        const todayOrder = orders.subOrders.find(item => new Date(item.orderDate).toISOString() === currentDateString)
        if(!todayOrder)
            return res.status(400).send({
                message: `SubOrder Doesn't Exist`
            })
        console.log(todayOrder)
        todayOrder.otp = otp;

        const updatedOrders = orders.save()


        if (updatedOrders) {
            return res.status(200).send({
                message: 'OTP Generated!'
            })
        }



        return res.status(500).send({
            message: `Couldn't Generate OTP`
        })
    } catch (error) {
        console.log('Error in Sending OTP ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

export const completeOrder = async (req, res) => {
    try {
        const userID = req.user._id
        const { _id, title, customerID, kitchenID, customerName, subscriberFirstName, subscriberLastName, customerPaymentBreakdown, kitchenPaymentBreakdown } = req.body
        if(!_id || !title || !customerID || !kitchenID || !customerPaymentBreakdown || !kitchenPaymentBreakdown)
            return res.status(400).send({
                message: `Please Provide All Feilds`
            })
        if (title === 'Subscription') {

            if(!subscriberFirstName || !subscriberLastName)
                return res.status(400).send({
                    message: `Please Provide All Feilds`
                })

            const subscriber = await Subscriber.findById(_id)
            if (!subscriber) {
                return res.status(400).send({
                    message: `Subscription Doesn't Exist`
                })
            }

            const currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)
            const currentDateString = currentDate.toISOString()

            const completed = subscriber.subscriptionStatus.daysCompleted.find(item => new Date(item).toISOString() === currentDateString)
            if (completed)
                return res.status(400).send({
                    message: `Order Already Completed`
                })

            


            

            const orders = await subscriptionOrder.findOne({ subscriptionID: _id })
            const todayOrder = orders.subOrders.find(item => new Date(item.orderDate).toISOString() === currentDateString)
            if(!todayOrder)
                return res.status(400).send({
                    message: `Sub Order Doesn't Exist`
                })

            const record = await completeTransaction(todayOrder._id, kitchenID, customerID, customerPaymentBreakdown.perOrderPrice, kitchenPaymentBreakdown.perOrderPrice, 'subscription')
            console.log(record)
            if (!record)
                return res.status(500).send({
                    message: `Couldn't Complete Payment! Please Try Again!`
                })
                
            subscriber.subscriptionStatus.daysCompleted.push(currentDate);
            subscriber.subscriptionStatus.daysRemaining = subscriber.subscriptionStatus.daysRemaining.filter(item => new Date(item).toISOString() !== currentDateString)
    
            const updatedSubscriber = await subscriber.save()
            todayOrder.status = 'Completed';
            todayOrder.amountPaid = customerPaymentBreakdown.perOrderPrice
            todayOrder.amountRecieved = kitchenPaymentBreakdown.perOrderPrice

            const updatedOrders = orders.save()

            if (!updatedSubscriber || !updatedOrders)
                return res.status(500).send({
                    message: `Couldn't Complete the Order! Please fill a query`
                })

            const newHistory = {
                orderID: _id,
                kitchenID: userID,
                customerID: customerID,
                customerName: subscriberFirstName + ' ' + subscriberLastName,
                amountPaid: customerPaymentBreakdown.perOrderPrice,
                amountReceived: kitchenPaymentBreakdown.perOrderPrice

            }

            const createHistory = await history.create(newHistory)

            if (!createHistory)
                return res.status(500).send({
                    message: `Couldn't Add A Record! Please fill a query`
                })

            return res.status(200).send({
                message: 'Order Completed'
            })

        }

        else {
            if(!customerName)
                return res.status(400).send({
                    message: `Please Provide All Feilds`
                })
            
            const value = await order.findById(_id)
            if (!value) {
                return res.status(400).send({
                    message: `Order Doesn't Exist`
                })
            }
            const record = completeTransaction(_id, kitchenID, customerID, customerPaymentBreakdown.perOrderPrice, kitchenPaymentBreakdown.perOrderPrice, 'order')

            if (!record)
                return res.status(500).send({
                    message: `Couldn't Complete Payment! Please Try Again!`
                })


            value.status = 'Completed'
            value.orderDate = new Date()
            const updatedOrder = value.save()

            if (!updatedOrder)
                return res.status(500).send({
                    message: `Couldn't Complete the Order! Please fill a query`
                })

            // const newHistory = {
            //     orderID: _id,
            //     title: 'One-Time',
            //     kitchenID: userID,
            //     customerID: customerID,
            //     customerName,
            //     amountPaid: customerPaymentBreakdown.perOrderPrice,
            //     amountRecieved: kitchenPaymentBreakdown.perOrderPrice

            // }

            // const createHistory = await history.create(newHistory)

            // if (!createHistory)
            //     return res.status(500).send({
            //         message: `Couldn't Add A Record! Please fill a query`
            //     })

            return res.status(200).send({
                message: `Order Completed`
            })

        }

    } catch (error) {
        console.log('Error in Completing Order ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}