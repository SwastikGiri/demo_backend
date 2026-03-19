const Joi = require("joi");

const pricingItemSchema = Joi.object({
  tier: Joi.string()
    .valid("SIMPLE", "STANDARD", "PREMIUM", "LUXURY")
    .required()
    .messages({
      "any.only": "Tier must be one of SIMPLE, STANDARD, PREMIUM, or LUXURY.",
      "string.empty": "Pricing tier is required.",
    }),

  price_per_unit: Joi.number().positive().required().messages({
    "number.base": "Price must be a valid number.",
    "number.positive": "Price must be greater than zero.",
    "any.required": "Price per unit is required.",
  }),
});
exports.vendorSchema = Joi.object({
  business_name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Business name is required.",
    "string.min": "Business name must be at least 3 characters.",
    "string.max": "Business name must not exceed 100 characters.",
  }),

  service_type: Joi.string().required().messages({
    "string.empty": "Service type is required.",
    "any.required": "Service type is required.",
  }),

  description: Joi.string().allow("").max(500).messages({
    "string.max": "Description must not exceed 500 characters.",
  }),

  pricing: Joi.array()
    .items(
      pricingItemSchema
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one pricing tier is required.",
      "any.required": "Pricing details are required.",
    }),
});

exports.directVendorRegisterSchema = Joi.object({
  full_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required.",
    "string.min": "Full name must be at least 3 characters.",
    "string.max": "Full name must not exceed 50 characters.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "string.pattern.base": "Phone number must be exactly 10 digits.",
    }),

  business_name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Business name is required.",
    "string.min": "Business name must be at least 3 characters.",
    "string.max": "Business name must not exceed 100 characters.",
  }),

  service_type: Joi.string().required().messages({
    "string.empty": "Service type is required.",
  }),

  description: Joi.string().allow("").max(500).messages({
    "string.max": "Description must not exceed 500 characters.",
  }),

  pricing: Joi.array()
    .items(
      Joi.object({
        tier: Joi.string()
          .valid("SIMPLE", "STANDARD", "PREMIUM", "LUXURY")
          .required(),

        price_per_unit: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
});