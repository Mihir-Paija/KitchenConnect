import Joi from "joi";

// Define Joi schema
const orderJoiSchema = Joi.object({
  customerName: Joi.string().required().messages({
    "any.required": "Please enter the customer's name",
  }),
  orderDate: Joi.date().required().messages({
    "any.required": "Please enter the order date",
  }),
  wantDelivery: Joi.boolean().required().messages({
    "any.required": "Please specify if delivery is wanted",
  }),
  noOfTiffins: Joi.number().required().messages({
    "any.required": "Please enter the number of tiffins",
  }),
  address: Joi.string().required().messages({
    "any.required": "Please enter the address",
  }),
  status: Joi.string()
    .valid("Accepted", "Pending", "Rejected", "Completed")
    .required()
    .messages({
      "any.required": "Please enter the status",
    })
    .default("Pending"),
  comments: Joi.string().default(""),
  price: Joi.object({
    tiffinPrice: Joi.number().required().messages({
      "any.required": "Please enter the tiffin price",
    }),
    deliveryCharge: Joi.number().required().messages({
      "any.required": "Please enter the delivery charge",
    }),
    platformCommission: Joi.number().default(0.1),
    GST_on_tiffin: Joi.number().default(0.05),
    GST_on_service: Joi.number().default(0.18),
    serviceDiscount: Joi.number().default(null),
    kitchenDiscount: Joi.number().default(null),
  })
    .required()
    .messages({
      "any.required": "Please enter the price details",
    }),
  customerPaymentBreakdown: Joi.object({
    orderPrice: Joi.number().required().messages({
      "any.required": "Please enter the subscription price",
    }),
    platformCharge: Joi.number().required().messages({
      "any.required": "Please enter the platform charge",
    }),
    tax: Joi.number().required().messages({
      "any.required": "Please enter the tax amount",
    }),
    deliveryCharge: Joi.number().required().messages({
      "any.required": "Please enter the delivery charge",
    }),
    discount: Joi.number().required().messages({
      "any.required": "Please enter the discount amount",
    }),
    total: Joi.number().required().messages({
      "any.required": "Please enter the total amount",
    }),
  })
    .required()
    .messages({
      "any.required": "Please enter the customer payment breakdown",
    }),
  kitchenPaymentBreakdown: Joi.object({
    orderPrice: Joi.number().required().messages({
      "any.required": "Please enter the subscription price",
    }),
    platformCharge: Joi.number().required().messages({
      "any.required": "Please enter the platform charge",
    }),
    tax: Joi.number().required().messages({
      "any.required": "Please enter the tax amount",
    }),
    deliveryCharge: Joi.number().required().messages({
      "any.required": "Please enter the delivery charge",
    }),
    discount: Joi.number().required().messages({
      "any.required": "Please enter the discount amount",
    }),
    total: Joi.number().required().messages({
      "any.required": "Please enter the total amount",
    }),
  })
    .required()
    .messages({
      "any.required": "Please enter the kitchen payment breakdown",
    }),
});

const orderJoiValidate = async (data) => {
  try {
    const valid = await orderJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error in Joi validation: " + error.message);
  }
};

export default orderJoiValidate;
