import Joi from "joi";

const feedBackJoiSchema = Joi.object({
  rate: Joi.number().valid(1, 2, 3, 4, 5).required(),
  review: Joi.string().required(),
});

const feedBackJoiValidate = async (data) => {
  try {
    const valid = await feedBackJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error in Joi validation: " + error.message);
  }
};

export default feedBackJoiValidate;
