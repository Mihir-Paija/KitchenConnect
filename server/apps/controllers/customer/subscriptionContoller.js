import provider from "../../models/providerModel.js";
import subscriber from "../../models/subscriberModel.js";
import { sendNotification } from "../provider/subscriptionController.js";

export const subscribe = async (req, res) => {
    try {
        const { id, kitchenID, tiffinID, subscriptionID } = req.params;

        if (!kitchenID || !tiffinID || !subscriptionID)
            return res.status(404).send({
                message: `Invalid URL`
            })

        const { customerName, title, number, price, startDate, endDate, delivery, address } = req.body

        if (!customerName || !tiffinName || !tiffinType || !title || !number || !price || !version || !startDate || !endDate || delivery === undefined)
            return res.status(400).send({
                message: `Please Fill All Fileds`
            })

        if (delivery) {
            if (!address)
                return res.status(400).send({
                    message: `Please Fill All Fileds`
                })
        }

        const dayStarted = new Date(startDate);
        const dayEnded = new Date(endDate);

        dayStarted.setHours(0, 0, 0, 0);
        dayEnded.setHours(0, 0, 0, 0);


        const details = {
            providerID: kitchenID,
            customerID: id,
            customerName,
            tiffinID,
            tiffinName,
            tiffinType,
            subscriptionID,
            title,
            noOfTiffins: number,
            price,
            version,
            startDate: dayStarted,
            endDate: dayEnded,
            delivery,
            address: delivery ? address : null,
        }

        const newSubscriber = await subscriber.create(details)
        if (newSubscriber) {

            process.nextTick(async () => {
                try {
                    const kitchen = await provider.findById(kitchenID);
                    if (kitchen && kitchen.fcmToken) {
                        const heading = 'New Subscription Request';
                        const body = `You have received a subscription request for ${tiffinName} - ${tiffinType}!`
                        await sendNotification(kitchen.fcmToken, heading, body);
                        console.log('Notification sent successfully');
                    } else {
                        console.error('Kitchen or FCM token not found');
                    }
                } catch (error) {
                    console.error('Error fetching kitchen or sending notification:', error);
                }
            });

            console.log(newSubscriber)
            return res.status(201).send({
                message: `Sent Subscription Request`
            })
        }

        return res.status(500).send({
            message: `Couldn't Subscribe!`
        })

    } catch (error) {
        console.log('Error in Subscribing ', error);
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}