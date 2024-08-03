import Joi from "joi";

const signupJoiSchema = Joi.object({
    name: Joi.string().required(),
    id: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  
  const adminSignupValidation = async (data) => {
    try {
      const valid = await signupJoiSchema.validateAsync(data);
      return valid;
    } catch (error) {
      throw new Error("Error in admin validation : " + error.message);
    }
  };
  
  export default adminSignupValidation;
  