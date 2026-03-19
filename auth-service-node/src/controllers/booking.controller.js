const bookingService = require("../services/booking.service");
const EventBooking = require("../models/eventBooking.model");
const { bookingSchema } = require("../utils/booking.validator");

exports.createBooking = async (req, res) => {
  try {
    const { error } = bookingSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const booking = await bookingService.createBooking(
      req.user.id,
      req.body
    );

    res.status(201).json({
      message: "Event booked successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEstimate = async (req, res) => {
  try {
    const result = await bookingService.estimateBudget(req.body);

    res.status(200).json({
      message: "Budget estimated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const whereClause =
      req.user.role === "ADMIN"
        ? {}
        : { customer_id: req.user.id };
    const bookings = await EventBooking.findAll({
      where: whereClause,
    });

    res.json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await EventBooking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
    });
  }
};