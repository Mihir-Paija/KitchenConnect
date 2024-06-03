import mongoose from 'mongoose';
import tiffins from "../../models/tiffinModel.js";
import provider from "../../models/providerModel.js";
import { verifyJwt } from "../../utils/jwt.js";



export const getTiffins = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({
                message: "Please Login"
            })
        }

        const userID = verifyJwt(id).decoded.userID;

        const allLunchDetails = await tiffins.aggregate([
            { $match: { providerID: new mongoose.Types.ObjectId(userID), tiffinType: "Lunch" } },
            { $sort: {price: -1}}
        ])


        const lunch = allLunchDetails.map(item => ({
            id: item._id,
            name: item.name,
            shortDescription: item.shortDescription,
            foodType: item.foodType,
            price: item.price,
            hours: item.time[0] + item.time[1],
            mins: item.time[2] + item.time[3],
            deliveryDetails: {
            availability: item.deliveryDetails.availability, 
            deliveryCharge: item.deliveryDetails.availability ? item.deliveryDetails.deliveryCharge : null,
            deliveryTimeHrs: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[0] + item.deliveryDetails.deliveryTime[1]) : null ,
            deliveryTimeMins: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[2] + item.deliveryDetails.deliveryTime[3]) : null,
            }
        }))

        if (lunch.length === 0)
            return res.status(200).json([])

        return res.status(200).json(lunch)


    } catch (error) {
        console.log("Error in Getting Tiffins ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const addTiffins = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({
                message: "Please Login"
            })
        }

        const userID = verifyJwt(id).decoded.userID;
        const user = await provider.findById(userID)
        if (!user)
            return res.status(404).send({
                message: "User Doesn't Exist! Please Register"
            })

        console.log(user);

        const { name, shortDescription, foodType, price, tiffinType, hours, mins, availability, deliveryCharge, deliveryTimeHrs, deliveryTimeMins } = req.body
        if(!name || !shortDescription || !foodType || !price || !tiffinType || !hours || !mins || (availability === undefined))
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })
        
        let deliveryTime = undefined
        if (availability) {
            deliveryTime = deliveryTimeHrs + deliveryTimeMins
        }

        const deliveryDetails = {
            availability: availability,
            deliveryCharge: deliveryCharge === undefined ? null : deliveryCharge,
            deliveryTime: deliveryTime === undefined ? null : deliveryTime,
        }

        const readyTime = hours + mins
        const tiffin = {
            name,
            providerID: user._id,
            shortDescription,
            foodType,
            price,
            tiffinType,
            time: readyTime,
            deliveryDetails
        }

        const newTiffin = await tiffins.create(tiffin);

        if (newTiffin) {
            console.log(newTiffin);
            return res.status(201).send({
                message: "Tiffin Created Successfully"
            })
        }

        else {
            console.log("Couldn't Create Tiffin");
            return res.status(500).send({
                message: "Couldn't Create New Tiffin! Please Try Again"
            })
        }

    } catch (error) {
        console.log("Error in Adding Tiffins ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


export const editTiffin = async (req, res) => {
    try {
        const { id, tiffinID } = req.params;

        if (!id) {
            return res.status(400).send({
                message: "Please Login"
            })
        }

        const userID = verifyJwt(id).decoded.userID;
        const user = await provider.findById(userID)
        if (!user)
            return res.status(404).send({
                message: "User Doesn't Exist! Please Register"
            })

        const tiffin = await tiffins.findById(tiffinID)

        if (!tiffin)
            res.status(404).send({
                message: "Tiffin Doesn't Exist"
            })

        if (tiffin.providerID.toString() !== userID)
           return res.status(400).send({
                message: "You are not authorised to edit this tiffin!"
            })

        const { name, shortDescription, foodType, price, tiffinType, hours, mins, availability, deliveryCharge, deliveryTimeHrs, deliveryTimeMins } = req.body
        if(!name || !shortDescription || !foodType || !price || !tiffinType || !hours || !mins || (availability === undefined))
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })

        let deliveryTime = undefined
        if (availability) {
            deliveryTime = deliveryTimeHrs + deliveryTimeMins
        }

        const deliveryDetails = {
            availability: availability,
            deliveryCharge: deliveryCharge === undefined ? null : deliveryCharge,
            deliveryTime: deliveryTime === undefined ? null : deliveryTime,
        }

        const readyTime = hours + mins
        const updatedTiffin = {
            name,
            providerID: user._id,
            shortDescription,
            foodType,
            price,
            tiffinType,
            time: readyTime,
            deliveryDetails
        }

        const newTiffin = await tiffins.findByIdAndUpdate(tiffinID, updatedTiffin, { new: true })

        if (newTiffin) {
            console.log(newTiffin);
            return res.status(201).send({
                message: "Tiffin Edited Successfully"
            })
        }

        else {
            console.log("Couldn't Edit Tiffin");
            return res.status(500).send({
                message: "Couldn't Edit Tiffin! Please Try Again"
            })
        }

    } catch (error) {
        console.log("Error In Editing Tiffins ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const deleteTiffin = async (req, res) => {
    try {
        const { id, tiffinID } = req.params;

        if (!id) {
            return res.status(400).send({
                message: "Please Login"
            })
        }

        const userID = verifyJwt(id).decoded.userID;
        const user = await provider.findById(userID)
        if (!user)
            return res.status(404).send({
                message: "User Doesn't Exist! Please Register"
            })

        const tiffin = await tiffins.findById(tiffinID)

        if (!tiffin)
            return res.status(404).send({
                message: "Tiffin Doesn't Exist"
            })

        if (tiffin.providerID.toString() !== userID)
            return res.status(400).send({
                message: "You are not authorised to delete this tiffin!"
            })

        const deletedTiffin = await tiffins.findByIdAndDelete(tiffinID)

        if (!deletedTiffin)
            return res.status(500).send({
                message: "Couldn't Delete Tiffin! Please Try Again"
            })

        return res.status(200).send({
            message: "Tiffin Deleted Successfully!"
        })


    } catch (error) {
        console.log("Error In Deleting Tiffin ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


export const deactivateTiffin = async(req, res) =>{
    try {
        const { id, tiffinID } = req.params;

        if (!id) {
            return res.status(400).send({
                message: "Please Login"
            })
        }

        const userID = verifyJwt(id).decoded.userID;
        const user = await provider.findById(userID)
        if (!user)
            return res.status(404).send({
                message: "User Doesn't Exist! Please Register"
            })

        const tiffin = await tiffins.findById(tiffinID)

        if (!tiffin)
            return res.status(404).send({
                message: "Tiffin Doesn't Exist"
            })

        if (tiffin.providerID.toString() !== userID)
            return res.status(400).send({
                message: "You are not authorised to deactivate this tiffin!"
            })
        
        const currentState = tiffin.deactivate 
        
        const updatedTiffin = await tiffins.findByIdAndUpdate(
                tiffinID,
                { $set: { deactivate: !currentState } }, 
                { new: true }                   
              );
    
        if(updatedTiffin)
            return res.status(200).send({
                message: `Success`
            })
        
        return res.status(400).send({
                message: `Failure`
            })
    } catch (error) {
        console.log("Error In Deactivating Tiffin ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })        
    }
}