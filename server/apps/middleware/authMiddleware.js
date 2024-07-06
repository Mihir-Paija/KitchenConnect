import { verifyJwt } from "../utils/jwt.js";
import provider from "../models/providerModel.js";
import tiffins from "../models/tiffinModel.js";

export const authMiddleware = async(req, res, next) =>{
    try {
        const {id} = req.params
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

        req.user = user;
        
        next()

    } catch (error) {
        console.log('Error in Auth Middleware ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}

export const tiffinMiddleware = async(req, res, next) => {
    try {

        const {tiffinID} = req.params
        if(!tiffinID)
            return res.status(400).send({
            message: `Please Specify Tiffin`
        })

        const tiffin = await tiffins.findById(tiffinID)

        if (!tiffin)
            return res.status(404).send({
                message: "Tiffin Doesn't Exist"
            })
        
        const userID = req.user._id

        if (tiffin.providerID.toString() !== userID.toString())
            return res.status(400).send({
                message: "You do not own this tiffin!"
            })
        
        req.tiffin = tiffin
        
        next()


        
    } catch (error) {
        console.log('Error in Tiffin Middleware ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}