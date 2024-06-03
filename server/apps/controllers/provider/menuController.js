import menu from "../../models/menuModel.js";
import mongoose from 'mongoose';
import provider from "../../models/providerModel.js";
import tiffins from "../../models/tiffinModel.js";
import { verifyJwt } from "../../utils/jwt.js";

export const addMenu = async (req, res) => {
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
                message: "You are not authorised to add a menu!"
            })

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
            providerID: user._id,
            tiffinID,
            menu: []
        }

        let menuExists = await menu.find({ providerID: new mongoose.Types.ObjectId(userID), tiffinID: new mongoose.Types.ObjectId(tiffinID) })

        if (menuExists.length === 0) {
            newItem.menu.push(menuDetails);
            const newMenu = await menu.create(newItem)
            if (newMenu) {
                console.log(newMenu)
                return res.status(201).send({
                    message: "Menu Added Successfully"
                })
            }

            return res.status(500).send({
                message: "No"
            })

        }
        console.log(menuExists)
        console.log(menuExists[0].menu)

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