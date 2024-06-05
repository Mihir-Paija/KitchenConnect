import menu from "../../models/menuModel.js";
import mongoose from 'mongoose';
import provider from "../../models/providerModel.js";
import tiffins from "../../models/tiffinModel.js";
import { verifyJwt } from "../../utils/jwt.js";

export const getMenu = async(req, res) =>{
    try {
        const userID = req.user._id
        const {tiffinID} = req.params

        const currentMenu = await menu.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })
        if(currentMenu.length !== 0)
            return res.status(200).json(currentMenu[0].menu)
        
        const dummyMenu = [
            {
                day: "Mon",
                items: []
            },
            {
                day: "Tue",
                items: []
            },
            {
                day: "Wed",
                items: []
            },
            {
                day: "Thu",
                items: []
            },
            {
                day: "Fri",
                items: []
            },
            {
                day: "Sat",
                items: []
            },
            {
                day: "Sun",
                items: []
            }
        ];
        
        
        return res.status(200).json(dummyMenu)


    } catch (error) {
        console.log("Error in Fetching Menu - Provider ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export const addMenu = async (req, res) => {
    try {
        const userID = req.user._id
        const {tiffinID} = req.params

        const { day, itemName, quantity, unit } = req.body

        if (!day || !itemName || !quantity || !unit)
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })

        const itemDetails = {
            itemName,
            quantity,
            unit

        }

        const menuDetails = {
            day,
            items: itemDetails,
        }

        let newItem = {
            providerID: userID,
            tiffinID,
            menu: []
        }

        let menuExists = await menu.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if (menuExists.length === 0) {
            newItem.menu.push(menuDetails);
            const newMenu = await menu.create(newItem)
            if (newMenu) {
                return res.status(201).send({
                    message: "Menu Added Successfully"
                })
            }

            return res.status(500).send({
                message: "Menu Not Added!"
            })

        }

        let dayExists = menuExists[0].menu.find(menuItem => menuItem.day === day);
        console.log(dayExists)

        if (!dayExists) {
            menuExists[0].menu.push(menuDetails)

        }

        else {
            dayExists.items.push(itemDetails);
        }


        const updatedMenu = await menuExists[0].save();

        if (updatedMenu)
            return res.status(201).send({
                message: `Item Added Succesfully`
            })

        return res.status(500).send({
            message: "Couldn't Add Menu! Please Try Again"
        })

    } catch (error) {
        console.log("Error in Adding Menu ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}