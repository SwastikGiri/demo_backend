const EventBooking = require("../models/eventBooking.model");
const EventOffering = require("../models/eventOffering.model");
const { tierMultiplier } = require("../utils/pricing.util");

exports.estimateBudget = async (data) => {
  const { offering_id, guest_count, selected_tier } = data;

  if (!offering_id || !guest_count || !selected_tier) {
    throw new Error("Missing required fields for estimation");
  }

  const offering = await EventOffering.findByPk(offering_id);

  if (!offering) {
    throw new Error("Invalid event offering");
  }

  const multiplier = tierMultiplier[selected_tier];

  if (!multiplier) {
    throw new Error("Invalid pricing tier selected");
  }

  // Simple estimation logic (can improve later)
  const estimatedCost = offering.base_price + guest_count * 500 * multiplier;

  return {
    base_price: offering.base_price,
    guest_count,
    tier: selected_tier,
    estimated_cost: estimatedCost,
  };
};

exports.createBooking = async (userId, data) => {
  const estimate = await exports.estimateBudget(data);
  const booking = await EventBooking.create({
    ...data,
    customer_id: userId,
    total_estimated_cost: estimate.estimated_cost,
  });

  return booking;
};


