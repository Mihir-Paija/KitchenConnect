import wallet from "../../models/walletModel.js";
import provider from "../../models/providerModel.js";
import customer from '../../models/customerModel.js';
import { hashPassword } from "../../utils/bcrypt.js";
import mongoose from 'mongoose';
import { verifyJwt } from "../../utils/jwt.js";

export const getWallet = async(req, res) =>{
    try{
        const {id} = req.params
        const userID = verifyJwt(id).decoded.userID
        console.log(userID)
        if(!userID)
            return res.status(400).send({
                message: `Please Fill All Feilds`
            })
        
        if (!mongoose.Types.ObjectId.isValid(userID)) {
                throw new Error('Invalid userID format');
        }
        
        const exists = await wallet.findOne({ userID: new mongoose.Types.ObjectId(userID) });


        if(!exists){
            return res.status(200).send({
                wallet: false
            })
        }

        console.log(exists)

        const walletDetails = {
            wallet: true,
            walletID: exists._id,
            userID: exists.userID,
            amount: exists.amount,
            firstName: exists.firstName,
            lastName: exists.lastName,
            cardNumber: exists.cardNumber
        }

        return res.status(200).json(walletDetails)

    }catch(error){
        console.log('Error in fetching wallet ', error);
        return res.status(500).send({
            message: `Couldn't Fetch Wallet`
        })
    }

}

export const createWallet = async(req, res) =>{
    try {
        const {id} = req.params
        const {firstName, lastName, PIN, cardNumber} = req.body
        //const userID = verifyJwt(id).decoded.userID
        const userID = id;

        if(!userID || PIN.toString().length === 0 || !firstName || !lastName )
            return res.status(400).send({
                message: `Please Fill All Feilds`
            })

        let user;
    
        // if(type === 'provider')
        //     user = await provider.findById(userID);
        // else user = await customer.findById(userID)
    
        // if(!user)
        //     return res.status(400).send({
        //         message: `User Doesn't Exist`
        //     })
        
        const exists = await wallet.findOne({ userID: new mongoose.Types.ObjectId(userID) })

        if(exists){
            return res.status(400).send({
                message: `Wallet already Exists`
            })
        }

        const hashedPIN = await hashPassword(PIN)

        const newWallet = {
            userID,
            firstName,
            lastName,
            pin: hashedPIN,
            cardNumber:  cardNumber || null
            
        }

        const createWallet = await wallet.create(newWallet)

        if(createWallet)
            return res.status(201).send({
                message: `Wallet Created Succesfully`
            })
        
        return res.status(500).send({
                message: `Couldn't Create Wallet`
            })
  
    } catch (error) {
        console.log('Error in creating wallet ', error);
        return res.status(500).send({
            message: `Couldn't Create Wallet`
        })
        
    }
}