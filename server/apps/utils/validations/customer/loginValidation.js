import Joi from "joi";

//define joi schema
const loginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(13).required(),
});

const loginJoiValidate = async (data) => {
  try {
    const valid = await loginJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error login JOI validation : " + error.message);
  }
};

export default loginJoiValidate;
