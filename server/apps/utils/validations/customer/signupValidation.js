import Joi from "joi";

//define joi schema
const signupJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  password: Joi.string().min(6).max(13).required(),
  // city: Joi.string(),
});

const signupJoiValidate = async (data) => {
  try {
    const valid = await signupJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error signup JOI validation : " + error.message);
  }
};

export default signupJoiValidate;
