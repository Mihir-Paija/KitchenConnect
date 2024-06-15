import subscriber from '../../models/subscriberModel.js'
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {

    try {
        const userID = req.user._id;

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
            const { tiffinName, tiffinType, noOfTiffins, startDate, endDate, accepted } = subscriber._doc;

            if (new Date(startDate) <= currentDate && currentDate <= new Date(endDate) && accepted) {

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