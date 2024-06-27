import Subscriber from '../../models/subscriberModel.js'
import tiffins from '../../models/tiffinModel.js';
import order from '../../models/orderModel.js';
import wallet from '../../models/walletModel.js'
import mongoose, { Mongoose } from 'mongoose';
import transaction from '../../models/transactionModel.js';

const isDateInArray = (array, date) => {
    return array.some(d => new Date(d).toISOString() === new Date(date).toISOString());
};

const completeTransaction = async(orderID, kitchenID, customerID, customerAmount, kitchenAmount) =>{
    try {
       const customerWallet = await wallet.findOne({userID: new Mongoose.Types.ObjectId(customerID)})
       
       if(!customerWallet){
        return 0;
      }

      if(customerWallet.amount < customerAmount)
        return 0;
      
      const providerWallet = await wallet.findOne({userID: new Mongoose.Types.ObjectId(kitchenID)})

      if(!providerWallet){
        return 0;
      }

      customerWallet.amount -=customerAmount
      let updatedCustomerWallet = await customerWallet.save();

      let updatedProviderWallet

      if(updatedCustomerWallet){
      providerWallet.amount += kitchenAmount
      updatedProviderWallet = await providerWallet.save();
      } 
      else return 0;

      updatedCustomerWallet = null
      if(!updatedProviderWallet){
        while(!updatedCustomerWallet){
            customerWallet.amount +=customerAmount
            updatedCustomerWallet = await customerWallet.save()
        }

        return 0;
      }

      const newTransaction ={
        orderID: orderID,
        payerID: customerID,
        recieverID: kitchenID,
        amounPaid: customerAmount,
        amountRecieved: kitchenAmount,
      }

      const record = await transaction.create(newTransaction)

      if(!record)
         return 0;

      return 1;

    } catch (error) {
        console.log('Error in Completing Transaction ', error)
        return 0;
    }
}
  

export const getOrders = async (req, res) => {

    try {
        const userID = req.user._id;

        const tiffin = await tiffins.find({providerID: new mongoose.Types.ObjectId(userID) })

        const tiffinMap = new Map();

        for(const value of tiffin){
          const id = value._id.toString() 
          tiffinMap.set(id, [value.name, value.tiffinType])
        }

        const subscribers = await Subscriber.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

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

                if(isDateInArray(subscriptionStatus.daysOptedOut, currentDate)){
                    formattedSubscriber.customerOut = true
                    out = true;
                }

                if(isDateInArray(subscriptionStatus.providerOptedOut, currentDate)){
                    console.log('True')
                    formattedSubscriber.providerOut = true
                    out = true;
                }

                const arr = tiffinType === 'Lunch' ? lunch : dinner;

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
                    title: 'One Time',
                    providerOut: false,
                    customerOut: false,

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

        const orders = await order.find({ kitchenID: new mongoose.Types.ObjectId(userID) })

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
        console.log(userID)
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
        console.log(orders)

        for (const order of orders){
            for(const value of order.orders){
            orderSet.add(value._id.toString())
        }}
        
        const subscribers = await Subscriber.find({ kitchenID: new mongoose.Types.ObjectId(userID) })
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0)

        const bulkOperations = [];

        for(const subscriber of subscribers){
            const subscriberData = subscriber._doc
            const orderID = subscriberData._id.toString()
            if(orderSet.has(orderID)){
                subscriberData.subscriptionStatus.providerOptedOut.push(currentDate)
                subscriberData.subscriptionStatus.daysRemaining = subscriberData.subscriptionStatus.daysRemaining.filter(item => new Date(item) != currentDate())
                orderSet.delete(orderID)

                bulkOperations.push({
                    updateOne: {
                        filter: { _id: subscriberData._id },
                        update: { $set: { 'subscriptionStatus.providerOptedOut': subscriberData.subscriptionStatus.providerOptedOut, 'subscriptionStatus.daysRemaining': subscriberData.subscriptionStatus.daysRemaining } }
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

export const sendOTP = async(req, res) =>{
    try{
        const userID = req.user._id
        const {otp, order} = req.body
        console.log(otp)
        const customerID = order.customerID;
        console.log(customerID)

        //send OTP to customer

        return res.status(200).send({
            message: 'OTP Sent Successfully'
        })
    } catch(error){
        console.log('Error in Sending OTP ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

export const completeOrder = async(req, res) =>{
    try{
        const userID = req.user._id
        const {_id, title, customerID, kitchenID, customerPaymentBreakdown, kitchenPaymentBreakdown} = req.body
        if(title === 'Subscription'){

            const subscriber = await Subscriber.findById(_id)
            if(!subscriber){
                return res.status(400).send({
                    message: `Subscription Doesn't Exist`
                })
            }

            console.log(subscriber)
            const currentDate = new Date()
            currentDate.setHours(0,0,0,0)

            subscriber.subscriptionStatus.daysCompleted.push(currentDate);
            subscriber.subscriptionStatus.daysRemaining = subscriber.subscriptionStatus.daysRemaining.filter(item => new Date(item) != currentDate())

            const updatedSubscriber = await subscriber.save()

            //also update history Schema
            const record = completeTransaction(_id, kitchenID, customerID, customerPaymentBreakdown.perOrderPice, kitchenPaymentBreakdown.perOrderPrice)

            if(updatedSubscriber && record){
                return res.status(200).send({
                    message: `Order Completed`
                })
            }

            return res.status(500).send({
                message: `Couldn't Complete Order`
            })


        }

        else{
            const value = await order.findById(_id)
            if(!value){
                return res.status(400).send({
                    message: `Order Doesn't Exist`
                })
            }

            value.status = 'Completed'
            value.orderDate = new Date()
            const updatedOrder = value.save()

            const record = completeTransaction(_id, kitchenID, customerID, customerPaymentBreakdown.total, kitchenPaymentBreakdown.total)

            if(updatedOrder){
                return res.status(200).send({
                    message: `Order Completed`
                })
            }

            return res.status(500).send({
                message: `Couldn't Complete Order`
            })


        }
        
    } catch(error){
        console.log('Error in Completing Order ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}