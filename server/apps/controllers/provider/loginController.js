import provider from '../../models/providerModel.js'
import providerLoginJoiValidation from '../../utils/validations/provider/loginValidation.js'
import { comparePassword } from "../../utils/bcrypt.js";
import { signJwt, maxAge } from '../../utils/jwt.js'


export const providerLoginGet = async(req, res) =>{
	try{
		return res.status(200).send({
		message: "Login to KitchenConnect"
		})
	}catch(error){
	 	console.log(error)
	 	return res.status(500).send({
	 		message: "Internal Server Error"
	 	})
	}	
}

export const providerLoginPost = async(req, res) =>{
	try{
	 const valid = await providerLoginJoiValidation(req.body);
	 const {email, password} = req.body;

	 const user = await provider.findOne({ email });

	 if(!user){
	 	return res.staus(409).send({
	 		message: "User Doesn't Exist! Please Register."
	 	})
	 }

	const isMatch = await comparePassword(password, user.password)

	if(!isMatch){
		return res.status(400).send({
			message: "Incorrect Details! Please Try Again"
		})
	}

	const tokenID = { userID: user._id };
    const token = signJwt(tokenID, process.env.JWT_SECRET);

    res.cookie("Welcome", token, { httpOnly: true, maxAge: maxAge * 1000 });

    return res.status(200).send({
    	message: 'Login Successful',
    	authToken: token,
    })


    
	}catch(error){
		console.log("Error in Login provider\n" + error)
	 	return res.status(500).send({
	 		message: "Internal Server Error"
	 	})
	}
}