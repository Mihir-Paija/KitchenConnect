import { mongoose } from "mongoose";
import order from "../../models/orderModel.js";
import Subscriber from "../../models/subscriberModel.js";
import history from "../../models/historyModel.js";
import tiffins from "../../models/tiffinModel.js";

const insertInHistory = (record, totalHistory, count) =>{
    //console.log(totalHistory)
    let floor = count-1;
    const currentDate = new Date(record.createdAt);

    let low = 0;
    let high = count-1;

    while(low <= high){
        let mid = Math.floor((low+high)/2);
        console.log(mid);
        console.log(totalHistory)
        const midDate = new Date(totalHistory[mid].createdAt)

        if(midDate === currentDate){
            floor = mid;
            break;
        }else if(midDate > currentDate){
            low = mid+1;
        }else{
            floor = mid;
            high = mid-1;
        }
    }

    totalHistory.splice(floor+1, 0, record);

}

export const getHistory = async(req, res) =>{
    try{
        const userID = req.user._id;

        const historyRecords = await history.find({kitchenID: new mongoose.Types.ObjectId(userID)})
        const tiffinValue = new Map();
        const subValue = new Map();

        const allTiffins = await tiffins.find({providerID: new mongoose.Types.ObjectId(userID)});
        
        for(const value of allTiffins){
            const tiffinID = value._id.toString();
            const details = [value.name, value.tiffinType]

            tiffinValue[tiffinID] = details;
        }

        const allSubscribers = await Subscriber.find({kitchenID: new mongoose.Types.ObjectId(userID)})
        for(const value of allSubscribers){
            const subID = value._id.toString();
            const tiffinID = value.tiffinID.toString();
            subValue[subID] = [tiffinID, value.noOfTiffins];
        }

        const allOrders = await order.find({kitchenID: new mongoose.Types.ObjectId(userID), status: 'Completed'})
        const totalHistory = []
        let count = 0;

        for(const value of historyRecords){
                const subID = value._doc.orderID.toString();
                const subDetails = subValue[subID];
                const tiffinDetails = tiffinValue[subDetails[0]];
                const formattedHistory = {
                    ...value._doc,
                    noOfTiffins: subDetails[1],
                    title: 'Subscription',
                    tiffinName: tiffinDetails[0],
                    tiffinType: tiffinDetails[1]
                }

                insertInHistory(formattedHistory, totalHistory, count)
                count++;
        }

        for(const value of allOrders){
                const tiffinID = value._doc.tiffinID.toString()
                console.log(tiffinID)
                console.log(tiffinValue)
                const tiffinDetails = tiffinValue[tiffinID];
                const formattedHistory = {
                    ...value._doc,
                    title: 'One-Time',
                    tiffinName: tiffinDetails[0],
                    tiffinType: tiffinDetails[1]
                }

                insertInHistory(formattedHistory, totalHistory, count)
                count++;
        }  
        return res.status(200).json(totalHistory)

        
    }catch(error){
        console.log('Error in Fetching History ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}