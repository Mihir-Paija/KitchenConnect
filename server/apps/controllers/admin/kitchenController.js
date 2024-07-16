import provider from "../../models/providerModel.js"

export const getKitchenCount = async(req, res) =>{
    try {
       const kitchens = await provider.find()
       
       const count = kitchens.length

       return res.status(200).send({
        count: count
       })
    } catch (error) {
        console.log(`Error in getting kitchen count `, error)
        return res.status(500).send({
            message: `Internal Server Error`
        })
    }
}

export const getKitchenDetails = async(req, res) =>{
    try {
        const {email} = req.body
        if(!email)
            return res.status(400).send({
                message: `Please Enter Email!`
            })
        
        const details = await provider.findOne({email: email})
        if(!details)
            return res.status(200).send({
                message: `Kitchen Doesn't Exist`
            })
        
        const toSend = {
            name: details.name,
            email: details.email,
            mobile: details.mobile,
            city: details.city,
        }

        return res.status(200).json(toSend)
     } catch (error) {
         console.log(`Error in getting kitchen details `, error)
         return res.status(500).send({
             message: `Internal Server Error`
         })
     }
}