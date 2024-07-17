import { verifyJwt } from "../utils/jwt.js";
import admin from "../models/adminModel.js";

export const adminAuthMiddleware = async(req, res, next) =>{
    try {
        const session = req.cookies.Session
        if(!session)
            return res.status(400).send({
                expired: true,
                message: `Session Expired! Please Login`
            })
        
        const token = verifyJwt(session).decoded

        const userID = token.userID
        const role = token.role

        const user = await admin.findOne({id: userID})
        if (!user)
            return res.status(404).send({
                message: "User Doesn't Exist! Please Register"
            })

        req.user = {
            userID,
            role
        }
        
        next()

    } catch (error) {
        console.log('Error in Auth Middleware ', error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}