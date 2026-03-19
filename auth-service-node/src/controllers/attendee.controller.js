const Attendee = require("../models/attendee.model");
const EventBooking = require("../models/eventBooking.model");

exports.registerAttendee = async (req, res) => {
  try{const userId = req.user.id;
  const { event_id } = req.body;

  const booking = await EventBooking.findByPk(event_id);

  if (!booking) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  if (booking.event_type !== "PUBLIC") {
    return res.status(400).json({
      message: "Attendee registration is allowed only for public events.",
    });
  }
  const existing = await Attendee.findOne({
    where: { event_id, user_id: userId },
  });

  if (existing) {
    return res.status(400).json({
      message: "Already registered for this event",
    });
  }

  const attendee = await Attendee.create({
    event_id,
    user_id: userId,
  });

  res.json({
    message: "Registered successfully",
    attendee,
  });} catch (error) {
    res.status(500).json({
      message: "Error registering attendee",
    });
  }
};
