import subscriber from "../../models/subscriberModel.js";
import mongoose from 'mongoose';
import { formatDate } from "../../utils/formatDate.js";

export const getSubscribers = async (req, res) => {
    try {
        const userID = req.user._id;

        const subscribers = await subscriber.find({ providerID: new mongoose.Types.ObjectId(userID) })
        
        const active = [];
        const pending = [];
        const completed = [];
        const tiffinSet = new Set();
        tiffinSet.add('All')

        if (subscribers) {
            const currentDate = new Date();

            for (const subscriber of subscribers) {
                const subscriberData = subscriber._doc
                const formattedSubscriber = {
                  ...subscriberData,
                  formattedStartDate: formatDate(new Date(subscriberData.startDate)),
                  formattedEndDate: formatDate(new Date(subscriberData.endDate)),
                };
        
                if (new Date(subscriberData.endDate) < currentDate && subscriberData.accepted) {
                  completed.push(formattedSubscriber);
                }
                else if (subscriberData.accepted) {
                    tiffinSet.add(subscriberData.tiffinName)
                  active.push(formattedSubscriber);
                } else if (subscriberData.pending) {
                  pending.push(formattedSubscriber);
                }
            }

            const tiffins = Array.from(tiffinSet)

            return res.status(200).send({
                active: active,
                pending: pending,
                completed: completed,
                tiffins: tiffins
            })
        }

        return res.status(200).send({
                active: active,
                pending: pending,
                completed: completed,
            })
    } catch (error) {
        console.log('Error in Fetching Subscribers ', error);
        return res.status(500).send({
            messaeg: `Internal Server Error`
        })
    }
}

export const decideStatus = async (req, res) => {
    try {
        const { subscriptionID } = req.params;
        console.log(subscriptionID)
        const { accepted, comments } = req.body

        const current = await subscriber.findById(subscriptionID)

        if (!current)
            return res.status(404).send({
                message: `Subscriber Not Found`
            })

        current.accepted = accepted;
        current.pending = false;
        current.comments = comments ? comments : null

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