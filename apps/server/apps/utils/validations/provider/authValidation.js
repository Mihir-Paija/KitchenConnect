import Joi from "joi";

const providerSignUpJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  password: Joi.string().min(6).max(13).required(),
  city: Joi.string().required(),
  businessName: Joi.string().required(),
  shortDescription: Joi.string().required(), 
  flatNumber: Joi.string().required(), 
  street: Joi.string().required(), 
  landmark: Joi.string(), 
  provideDelivery: Joi.boolean().required()
});

export const providerSignUpJoiValidation = async (data) => {
  try {
    const valid = await providerSignUpJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    console.log("Error in SignUp Validation ", error)
  }
};


const providerLoginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(13).required(),

});

export const providerLoginJoiValidation = async (data) => {
  try {
    const valid = await providerLoginJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    console.log("Error in Login Validation ", error)
  }
};

export default {providerSignUpJoiValidation, providerLoginJoiValidation};
