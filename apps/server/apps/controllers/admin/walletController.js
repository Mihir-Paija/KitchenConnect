import transaction from '../../models/transactionModel.js'
import mongoose from 'mongoose'

export const fetchAdminTransactions = async(req, res) =>{
    try {

    const allTransactions = await transaction.find({walletID: new mongoose.Types.ObjectId('669fa3176f5e2f1f9af996dd')})  

    console.log(allTransactions)
    if(allTransactions.length)
        return res.status(200).json(allTransactions)

    return res.status(200).json([]);
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error Occurred`
        })
    }
}