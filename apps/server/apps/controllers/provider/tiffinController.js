import mongoose from 'mongoose';
import tiffins from "../../models/tiffinModel.js";
import provider from "../../models/providerModel.js";

export const getLunchTiffins = async (req, res) => {
    try {
        const userID = req.user._id
        const allLunchDetails = await tiffins.aggregate([
            { $match: { providerID: new mongoose.Types.ObjectId(userID), tiffinType: "Lunch" } },
            { $sort: {price: -1}}
        ])


        const lunch = allLunchDetails.map(item => ({
            id: item._id,
            providerID: item.providerID,
            name: item.name,
            shortDescription: item.shortDescription,
            tiffinType: 'Lunch',
            foodType: item.foodType,
            price: item.priceDetails.price,
            hours: item.time[0] + item.time[1],
            mins: item.time[3] + item.time[4],
            deactivated: item.deactivate,
            rating: item.rating,
            ratingsize: item.ratingsize,
            deliveryDetails: {
            availability: item.deliveryDetails.availability, 
            deliveryCharge: item.deliveryDetails.availability ? item.deliveryDetails.deliveryCharge : null,
            deliveryTimeHrs: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[0] + item.deliveryDetails.deliveryTime[1]) : null ,
            deliveryTimeMins: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[3] + item.deliveryDetails.deliveryTime[4]) : null, 
            }
            
        }))

        if (lunch.length === 0)
            return res.status(200).json([])

        return res.status(200).json(lunch)


    } catch (error) {
        console.log("Error in Getting Lunch Tiffins ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const getDinnerTiffins = async (req, res) => {
    try {
        const userID = req.user._id
        const allDinnerDetails = await tiffins.aggregate([
            { $match: { providerID: new mongoose.Types.ObjectId(userID), tiffinType: "Dinner" } },
            { $sort: {price: -1}}
        ])


        const dinner = allDinnerDetails.map(item => ({
            id: item._id,
            providerID: item.providerID,
            name: item.name,
            shortDescription: item.shortDescription,
            tiffinType: 'Dinner',
            foodType: item.foodType,
            price: item.priceDetails.price,
            hours: item.time[0] + item.time[1],
            mins: item.time[3] + item.time[4],
            deactivated: item.deactivate,
            rating: item.rating,
            ratingsize: item.ratingsize,
            deliveryDetails: {
            availability: item.deliveryDetails.availability, 
            deliveryCharge: item.deliveryDetails.availability ? item.deliveryDetails.deliveryCharge : null,
            deliveryTimeHrs: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[0] + item.deliveryDetails.deliveryTime[1]) : null ,
            deliveryTimeMins: item.deliveryDetails.availability ? (item.deliveryDetails.deliveryTime[3] + item.deliveryDetails.deliveryTime[4]) : null, 
            }
            
        }))

        if (dinner.length === 0)
            return res.status(200).json([])

        return res.status(200).json(dinner)


    } catch (error) {
        console.log("Error in Getting Dinner Tiffins ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const addTiffins = async (req, res) => {
    try {
        const userID = req.user._id

        const { name, shortDescription, foodType, price, tiffinType, hours, mins, availability, deliveryCharge, deliveryTimeHrs, deliveryTimeMins, providePacking, packingCharge } = req.body
        if(!name || !shortDescription || !foodType || !price || !tiffinType || !hours || !mins || (availability === undefined) || (providePacking === undefined))
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })
        
        
        
        if(providePacking){
            if(!packingCharge)
                return res.status(400).send({
                    message: `Please Provide Packing Charge`
                })
        }
        
        let deliveryTime = undefined
        if (availability) {
            if(!deliveryTimeHrs || !deliveryTimeMins)
                return res.status(400).send({
                message: `Delivery Time Not Available`
            })
            deliveryTime = deliveryTimeHrs + ':' + deliveryTimeMins
        }

        const deliveryDetails = {
            availability: availability,
            deliveryCharge: !availability ? null : deliveryCharge,
            deliveryTime: deliveryTime === undefined ? null : deliveryTime,
        }

        const priceDetails ={
            price,
            commission: 0,
            kitchenDiscount: 0,
            serviceDiscount: 0,
        }

        const readyTime = hours + ':' + mins
        const tiffin = {
            name,
            providerID: userID,
            shortDescription,
            foodType,
            priceDetails,
            tiffinType,
            time: readyTime,
            deliveryDetails,
            providePacking,
            packingCharge: providePacking ? packingCharge : null
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
        const userID = req.user._id
        const {tiffinID} = req.params

        const { name, shortDescription, foodType, price, tiffinType, hours, mins, availability, deliveryCharge, deliveryTimeHrs, deliveryTimeMins } = req.body
        if(!name || !shortDescription || !foodType || !price || !tiffinType || !hours || !mins || (availability === undefined))
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })

        let deliveryTime = undefined
        if (availability) {
            deliveryTime = deliveryTimeHrs + ':' + deliveryTimeMins
        }

        const deliveryDetails = {
            availability: availability,
            deliveryCharge: deliveryCharge === undefined ? null : deliveryCharge,
            deliveryTime: deliveryTime === undefined ? null : deliveryTime,
        }

        const priceDetails ={
            price,
            commission: 0,
            kitchenDiscount: 0,
            serviceDiscount: 0,
        }

        const readyTime = hours + ':' + mins
        const updatedTiffin = {
            name,
            providerID: userID,
            shortDescription,
            foodType,
            priceDetails,
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
        const {tiffinID } = req.params;

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
        
        const tiffin = req.tiffin
        const tiffinID = tiffin._id

        const currentState = tiffin.deactivate 
        console.log(currentState)
        
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