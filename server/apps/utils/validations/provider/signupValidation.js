import Joi from "joi";

const providerSignUpJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  password: Joi.string().min(6).max(13).required(),
  city: Joi.string().required(),
  businessName: Joi.string().required()
});

const providerSignUpJoiValidation = async (data) => {
  try {
    const valid = await providerSignUpJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error In Validating Provider SignUp " + error);
  }
};

export default providerSignUpJoiValidation;
