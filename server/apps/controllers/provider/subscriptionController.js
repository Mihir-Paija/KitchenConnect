import subscription from "../../models/subscriptionModel.js";
import mongoose from 'mongoose';
import { admin } from "../../utils/firebaseAdmin.js";
import axios from 'axios';
import { serviceAccount } from "../../utils/serviceKey.js";
//import { google } from 'googleapis';
//import { JWT } from 'google-auth-library';
//const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

export const getSubscriptions = async (req, res) => {
    try {
        const userID = req.user._id;
        const { tiffinID } = req.params

        const currentSubs = await subscription.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if (currentSubs.length !== 0) {
            return res.status(200).json(currentSubs[0].subscriptions)
        }
        return res.status(200).json([]);

    } catch (error) {
        console.log("Error in Fetching Subscriptions - Provider ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const addSubscription = async (req, res) => {
    try {
        const userID = req.user._id;
        const { tiffinID } = req.params;

        console.log(userID);
        console.log(tiffinID);

        const { title, price, days, description } = req.body;

        if (!title || !price || !days || !description) {
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })
        }
        const details = {
            title,
            price,
            days,
            description
        }

        let newSub = {
            providerID: userID,
            tiffinID,
            subscriptions: []
        }

        let subExists = await subscription.findOne({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if (!subExists) {
            newSub.subscriptions.push(details);
            const addedSub = await subscription.create(newSub)
            if (addedSub) {
                return res.status(201).send({
                    message: "Subscription Added Successfully"
                })
            }

            return res.status(500).send({
                message: "Subscription Not Added!"
            })

        }

        let titleExists = subExists.subscriptions.find(item => item.title === title);

        if (titleExists) {
            console.log(titleExists)
            return res.status(400).send({
                message: `Subscription Already Exists!`
            })
        }
        subExists.subscriptions.push(details);

        const updatedSub = await subExists.save();
        // console.log(await subscription.findOne({ _id: subExists._id }))
        // const updatedSub = await subscription.updateOne(
        //     { _id: subExists._id },
        //     { $push: { subscriptions: details } }
        // );

        if (updatedSub) {
            console.log(updatedSub)
            return res.status(201).send({
                message: `Subscription Added Succesfully`
            })
        }
        return res.status(500).send({
            message: "Couldn't Add Subscription! Please Try Again"
        })

    } catch (error) {
        console.log("Error in Adding Subscription\n", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const editSubscription = async (req, res) => {
    try {
        const userID = req.user._id;
        const { tiffinID } = req.params;

        const { title, description, price } = req.body;

        let sub = await subscription.findOne({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) });
        if (!sub) {
            return res.status(404).send({
                message: "Subscription not found"
            });
        }

        let titleExists = sub.subscriptions.find(item => item.title === title);

        if (!titleExists) {
            return res.status(404).send({
                message: "Subscription item not found"
            });
        }

        titleExists.description = description
        titleExists.price = price;

        const updatedSub = sub.save()

        if (updatedSub) {
            console.log(updatedSub)
            return res.status(201).send({
                message: `Subscription Edited Succesfully`
            })
        }
        return res.status(500).send({
            message: "Couldn't Edit Subscription! Please Try Again"
        })


    } catch (error) {
        console.log("Error in Editing Subscription\n", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const deleteSubscription = async (req, res) => {
    try {
        const userID = req.user._id;
        const { tiffinID } = req.params;

        const { title } = req.body;

        let sub = await subscription.findOne({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) });

        if (!sub) {
            return res.status(404).send({
                message: "Subscription not found"
            });
        }

        const index = sub.subscriptions.findIndex(item => item.title === title);

        if (index === -1) {
            console.log("index")
            return res.status(404).send({
                message: "Subscription item not found"
            });
        }

        sub.subscriptions.splice(index, 1);


        const deletedSub = await sub.save();

        if (deletedSub) {
            return res.status(200).send({
                message: "Subscription Deleted Successfully"
            });
        }


        return res.status(400).send({
            message: `Couldn't Delete Subscription`
        })
    } catch (error) {
        console.log("Error in Deleting Subscription\n", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const getAccessToken = async () => {

    const key = serviceAccount
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
    );
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            reject(err);
            return;
        }
        //console.log(tokens)
        return tokens.access_token
    });
}


export const sendNotification = async (token) => {
   
    try {
        const fcmToken = token
        console.log(fcmToken)

        const message = {
            notification: {
                title: "KitchenConnect",
                body: "You got 1 new subscription",
            },
            token: fcmToken,
        };

        const response = await admin.messaging().send(message);
        console.log(response);

        // const accessToken = await getAccessToken()
        // console.log(accessToken)
        // const fcmUrl = 'https://fcm.googleapis.com/v1/projects/kitchenconnect-2021/messages:send';
        // const response = await axios.post(fcmUrl, message, {
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': `Bearer ${accessToken}`,
        //         },
        //       });


        if (response) {
            console.log(response)
            return res.status(200).send({
                message: `Successfully sent message`
            })
        }
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).send({
            message: `Unsuccessfully sent message`
        })
    }
}
