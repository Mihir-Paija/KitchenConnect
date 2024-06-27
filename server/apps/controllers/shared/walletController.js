import wallet from "../../models/walletModel";
import provider from "../../models/providerModel";
import customer from '../../models/customerModel';
import { hashPassword } from "../../utils/bcrypt";

export const getWallet = async(req, res) =>{
    try{
        const {userID} = req.body
        if(!userID)
            return res.status(400).send({
                message: `Please Fill All Feilds`
            })
        
        const exists = await wallet.findOne({userID})

        if(exists.length === 0){
            return res.status(400).send({
                message: `Wallet Hasn't Been Created For User`
            })
        }

        const walletDetails = {
            walletID: exists._id,
            userID: exists.userID,
            amount: exists.amount,
            firstName: exists.firstName,
            lastName: exists.lasttName,
            cardNumber: exists.cardNumber
        }

        return res.status(200).json(walletDetails)




    }catch(error){
        console/log('Error in creating wallet ', error);
        return res.status(500).send({
            message: `Couldn't Create Wallet`
        })
    }

}

export const createWallet = async(req, res) =>{
    try {
        const {userID, firstName, lastName, PIN, type, cardNumber} = req.body

        if(!userID || PIN.toString.length() === 0 || !firstName || !lastName || !type)
            return res.status(400).send({
                message: `Please Fill All Feilds`
            })

        let user;
    
        if(type === 'provider')
            user = await provider.findById(userID);
        else user = await customer.findById(userID)
    
        if(user.length === 0)
            return res.status(400).send({
                message: `User Doesn't Exist`
            })
        
        const exists = await wallet.findOne({userID})

        if(exists.length !== 0){
            return res.status(400).send({
                message: `Wallet already Exists`
            })
        }

        const hashedPIN = hashPassword(PIN)

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
        console/log('Error in creating wallet ', error);
        return res.status(500).send({
            message: `Couldn't Create Wallet`
        })
        
    }
}