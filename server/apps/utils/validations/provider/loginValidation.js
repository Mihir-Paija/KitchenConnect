import Joi from "joi";


const providerLoginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(13).required(),

});

const providerLoginJoiValidation = async (data) => {
  try {
    const valid = await providerLoginJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error In Validating Provider SignUp " + error);
  }
};

export default providerLoginJoiValidation;