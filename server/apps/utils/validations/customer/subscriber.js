import Joi from "joi";

// Define Joi schema
const subscriberJoiSchema = Joi.object({
  subscriberFirstName: Joi.string().required().messages({
    "any.required": "Please enter the subscriber's first name",
  }),
  subscriberLastName: Joi.string().required().messages({
    "any.required": "Please enter the subscriber's last name",
  }),
  startDate: Joi.date().required().messages({
    "any.required": "Please enter the start date",
  }),
  endDate: Joi.date().required().messages({
    "any.required": "Please enter the end date",
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
  subscriptionStatus: Joi.object({
    status: Joi.string()
      .valid("Current", "Pending", "Rejected", "Cancelled")
      .required()
      .messages({
        "any.required": "Please enter the status",
      }),
    daysRemaining: Joi.array().items(Joi.date()).default([]),
    daysOptedOut: Joi.array().items(Joi.date()).default([]),
    daysCompleted: Joi.array().items(Joi.date()).default([]),
    cancelDate: Joi.date().default(null),
  })
    .required()
    .messages({
      "any.required": "Please enter the subscription status",
    }),
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
    lowerLimit: Joi.number().required().messages({
      "any.required": "Please enter the lower limit",
    }),
  })
    .required()
    .messages({
      "any.required": "Please enter the price details",
    }),
  customerPaymentBreakdown: Joi.object({
    subscriptionPrice: Joi.number().required().messages({
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
    moneyTransferTillNow: Joi.number().default(0),
    perOrderPrice: Joi.number().required().messages({
      "any.required": "Please enter the per-order price",
    }),
  })
    .required()
    .messages({
      "any.required": "Please enter the customer payment breakdown",
    }),
  kitchenPaymentBreakdown: Joi.object({
    subscriptionPrice: Joi.number().required().messages({
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
    moneyTransferTillNow: Joi.number().default(0),
    perOrderPrice: Joi.number().required().messages({
      "any.required": "Please enter the per-order price",
    }),
  })
    .required()
    .messages({
      "any.required": "Please enter the kitchen payment breakdown",
    }),
});

const subscriberJoiValidate = async (data) => {
  try {
    const valid = await subscriberJoiSchema.validateAsync(data);
    return valid;
  } catch (error) {
    throw new Error("Error in Joi validation: " + error.message);
  }
};

export default subscriberJoiValidate;
