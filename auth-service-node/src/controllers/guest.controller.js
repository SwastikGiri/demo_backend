const Guest = require("../models/guest.model");
const EventBooking = require("../models/eventBooking.model");

// Add guests
exports.addGuests = async (req, res) => {
  try {
    const { event_id, guests } = req.body;

    if (!event_id || !Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({
        message: "Event ID and at least one guest are required.",
      });
    }

    const booking = await EventBooking.findByPk(event_id);

    if (!booking) {
      return res.status(404).json({
        message: "Event booking not found.",
      });
    }

    if (req.user.role === "CUSTOMER" && booking.customer_id !== req.user.id) {
      return res.status(403).json({
        message: "You can add guests only to your own booking.",
      });
    }

    if (booking.event_type !== "PRIVATE") {
      return res.status(400).json({
        message: "Guests can only be added to private events.",
      });
    }

    const created = await Guest.bulkCreate(
      guests.map((g) => ({
        event_id,
        name: g.name,
        email: g.email,
        phone: g.phone,
      }))
    );

    res.status(201).json({
      message: "Guests added successfully",
      guests: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding guests",
    });
  }
};

// Update RSVP
exports.updateRSVP = async (req, res) => {
  try {
    const { id } = req.params;
    const { rsvp_status } = req.body;

    const guest = await Guest.findByPk(id);

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    const booking = await EventBooking.findByPk(guest.event_id);

    if (!booking) {
      return res.status(404).json({ message: "Event booking not found" });
    }

    if (req.user.role === "CUSTOMER" && booking.customer_id !== req.user.id) {
      return res.status(403).json({
        message: "You can update RSVP only for guests in your own booking.",
      });
    }

    guest.rsvp_status = rsvp_status;
    await guest.save();

    res.json({ message: "RSVP updated", guest });
  } catch (error) {
    res.status(500).json({
      message: "Error updating RSVP",
    });
  }
};

// Update invitation status
exports.updateInvitationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { invitation_status } = req.body;

    const guest = await Guest.findByPk(id);

    if (!guest) {
      return res.status(404).json({
        message: "Guest not found",
      });
    }

    guest.invitation_status = invitation_status;
    await guest.save();

    res.json({
      message: "Invitation status updated",
      guest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating invitation status",
    });
  }
};