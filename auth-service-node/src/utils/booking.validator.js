const Joi = require("joi");

exports.bookingSchema = Joi.object({
  offering_id: Joi.number().required().messages({
    "any.required": "Event offering is required.",
  }),

  event_type: Joi.string()
    .valid("PUBLIC", "PRIVATE")
    .required()
    .messages({
      "any.only": "Event type must be PUBLIC or PRIVATE.",
    }),

  guest_count: Joi.number().min(1).required().messages({
    "number.min": "Guest count must be at least 1.",
    "any.required": "Guest count is required.",
  }),

  selected_tier: Joi.string()
    .valid("SIMPLE", "STANDARD", "PREMIUM", "LUXURY")
    .required()
    .messages({
      "any.only":
        "Tier must be SIMPLE, STANDARD, PREMIUM, or LUXURY.",
    }),

  event_date: Joi.date().greater("now").required().messages({
    "date.greater": "Event date must be in the future.",
    "any.required": "Event date is required.",
  }),

  location: Joi.string().min(3).required().messages({
    "string.empty": "Location is required.",
  }),
});