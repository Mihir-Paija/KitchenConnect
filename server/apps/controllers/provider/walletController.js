import provider from "../../models/providerModel.js";
import wallet from "../../models/walletModel.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";


export const withdrawMoney = async(req, res) =>{
    try {
        const userID = req.user._id
        const {walletID} = req.params;
        const {amount, PIN} = req.body;

        const providerWallet = await wallet.findById(walletID);

        if(!providerWallet)
            return res.status(400).send({
                message: `Wallet Doesn't Exist!`
            })
        
        const isMatch = await comparePassword(PIN, providerWallet.pin)
        if(!isMatch)
            return res.status(400).send({
                message: `Incorrect PIN!`
            })
        
        if(providerWallet.amount < amount){
            return res.status(400).send({
                message: `Insufficient Balance`
            })
        }

        providerWallet.amount -= amount;
        providerWallet.save();

        return res.status(200).send({
            message: `Money Withdrawn`
        })

    } catch (error) {
        console.log(`Error In Withdrawing Money `, error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}