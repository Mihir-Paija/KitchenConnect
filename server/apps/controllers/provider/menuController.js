import menu from "../../models/menuModel.js";
import provider from "../../models/providerModel.js";
import tiffins from "../../models/tiffinModel.js";
import { verifyJwt } from "../../utils/jwt.js";

export const addMenu = async(req, res) =>{
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

        const {day, itemType, itemName, quantity, unit} = req.body

        if(!day || !itemType || !itemName || !quantity || !unit)
            return res.status(400).send({
                message: "Please Enter All Required Fields"
            })
        
        const menuDetails = {
            itemType,
            itemName,
            quantity, 
            unit

        }
        
        const newMenu =  {
            providerID: user._id,
            tiffinID,
            day,
            menu: menuDetails 
        }

        const add = await menu.create(newMenu)
        
        if(add){
            console.log(add)
            return res.status(201).send({
                message: "Menu Added Successfully"
            })
        }

        else{
            return res.status(500).send({
                message: "Couldn't Add Menu! Please Try Again"
            })
        }


        

    } catch (error) {
        console.log("Error in Adding Menu ", error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}