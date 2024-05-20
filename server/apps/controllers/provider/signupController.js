import provider from '../../models/providerModel.js'
import providerSignUpJoiValidation from '../../utils/validations/provider/signupValidation.js'
import { hashPassword } from "../../utils/bcrypt.js";

export const providerSignUpGet = async (req, res) =>{

	try{
		return res.status(200).send({
		message: "Register on KitchenConnect to Expand Your Business"
		})
	}catch(error){
	 	console.log(error)
	 	return res.status(500).send({
	 		message: "Internal Server Error"
	 	})
	}	

};

export const providerSignUpPost = async (req, res) =>{
	try{
	 const valid = await providerSignUpJoiValidation(req.body);
	 const {name, email, mobile, password, city, businessName} = req.body;

	 const user = await provider.findOne({ email });

	 if(user){
	 	return res.status(409).send({
	 		message: "User Already Exists! Please Login."
	 	})
	 }

	const hashedPassword = await hashPassword(password)
	console.log(typeof hashedPassword)

	const newUser = {
      name,
      email,
      mobile,
      password: hashedPassword,
      city,
      kitchenName: businessName
    };

    const newProvider = await provider.create(newUser)

    if(newProvider){
    	console.log(newProvider)
    	return res.status(201).send({
    		message: "Registered Successfully!"
    	})
    }

    else{
    	console.log("Couldn't Register Provider")
    	return res.status(500).send({
    		message: "Couldn't Register! Please Try Again."
    	})
    }

	}catch(error){
		console.log("Error in registering provider\n" + error)
	 	return res.status(500).send({
	 		message: "Internal Server Error"
	 	})
	}
}