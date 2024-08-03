import provider from '../../models/providerModel.js'

export const editPersonalDetails = async(req, res) =>{
    try {
       const userID = req.user._id;
       const {name, email, mobile} = req.body;
       const user = await provider.findById(userID)

       user.name = name;
       user.email = email;
       user.mobile = mobile;

       const updatedUser = await user.save()

       if(updatedUser)
        return res.status(200).send({
            message: 'Details Updated Succesfully'
        })

        return res.status(500).send({
            message: 'Could not Update Details'
        })

       
    } catch (error) {
        console.log('Error In Updating Personal Details ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

export const editKitchenDetails = async(req, res) =>{
    try {
       const userID = req.user._id;
       const {kitchenName, shortDescription, flatNumber, street, landmark} = req.body;
       const user = await provider.findById(userID)

       user.kitchenName= kitchenName;
       user.shortDescription  = shortDescription
       user.address.flatNumber = flatNumber
       user.address.street = street
       user.address.landmark = landmark

       const updatedUser = await user.save()

       if(updatedUser)
        return res.status(200).send({
            message: 'Details Updated Succesfully'
        })

        return res.status(500).send({
            message: 'Could not Update Details'
        })

       
    } catch (error) {
        console.log('Error In Updating Kitchen Details ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}


export const changeStatus = async(req, res) =>{
    try {
       const userID = req.user._id;
       const {deactivate} = req.body;
       const user = await provider.findById(userID)
       console.log(deactivate)

       user.deactivate = deactivate
      

       const updatedUser = await user.save()

       if(updatedUser)
        return res.status(200).send({
            message: 'Status Updated Succesfully'
        })

        return res.status(500).send({
            message: 'Could not Update Status'
        })

       
    } catch (error) {
        console.log('Error In Updating Status ', error)
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

export const deleteProvider = async() =>{
    try {
        const userID = req.user._id;

        const user = await provider.findByIdAndDelete(userID)

        //also delete tiffins

        if(user)
         return res.status(200).send({
             message: 'DeletedSuccesfully'
         })
 
         return res.status(500).send({
             message: 'Could Not Delete Account'
         })
 
        
     } catch (error) {
         console.log('Error In Deletingf Provider ', error)
         return res.status(500).send({
             message: 'Internal Server Error'
         })
     }
}



