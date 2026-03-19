const { EventOffering, User } = require("../models");
const VendorProfile = require("../models/vendorProfile.model");
const EventAssignment = require("../models/eventAssignment.model");
const EventBooking = require("../models/eventBooking.model");
const Guest = require("../models/guest.model");
const Attendee = require("../models/attendee.model");
const VendorPricing = require("../models/vendorPricing.model");

// Get pending vendors
exports.getPendingVendors = async (req, res) => {
  const vendors = await VendorProfile.findAll({
    where: { approval_status: "PENDING" },
  });

  res.json(vendors);
};

// Approve vendor
exports.approveVendor = async (req, res) => {
  const { id } = req.params;

  const vendor = await VendorProfile.findByPk(id);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  vendor.approval_status = "APPROVED";
  await vendor.save();

  await User.update({ role: "VENDOR" }, { where: { id: vendor.user_id } });

  res.json({ message: "Vendor approved" });
};

// Reject vendor
exports.rejectVendor = async (req, res) => {
  const { id } = req.params;

  const vendor = await VendorProfile.findByPk(id);

  if (!vendor) {
    return res.status(404).json({
      message: "Vendor profile not found.",
    });
  }

  vendor.approval_status = "REJECTED";
  vendor.rejection_reason = req.body.reason || "Not specified";
  await vendor.save();

  res.json({
    message: "Vendor rejected successfully.",
  });
};

//Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  await user.destroy();

  res.json({
    message: "User deleted successfully.",
  });
};

// Create event offering
exports.createOffering = async (req, res) => {
  try {
    const offering = await EventOffering.create(req.body);

    res.status(201).json({
      message: "Event offering created successfully",
      offering,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.assignVendor = async (req, res) => {
  try {
    const { event_id, vendor_id, service_type } = req.body;

    if (!event_id || !vendor_id || !service_type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existing = await EventAssignment.findOne({
      where: { event_id, vendor_id, service_type },
    });

    if (existing) {
      return res.status(400).json({
        message: "Vendor already assigned for this service in this event",
      });
    }
    const assignment = await EventAssignment.create({
      event_id,
      vendor_id,
      service_type,
    });

    res.status(201).json({
      message: "Vendor assigned successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error assigning vendor",
    });
  }
};

exports.getEventAssignments = async (req, res) => {
  const { event_id } = req.params;

  const assignments = await EventAssignment.findAll({
    where: { event_id },
  });

  res.json(assignments);
};


exports.getOfferings = async (req, res) => {
  try {
    const offerings = await EventOffering.findAll({
      where: { is_active: true },
    });

    res.json({
      message: "Offerings fetched successfully",
      offerings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching offerings",
    });
  }
};

exports.getAllBookings = async (req, res) => {
  const bookings = await EventBooking.findAll({
    order: [["created_at", "DESC"]],
  });

  res.json({
    success: true,
    message: "Bookings fetched successfully",
    data: bookings,
  });
};


exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password_hash"] },
    order: [["created_at", "DESC"]],
  });

  res.json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

exports.deactivateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.role === "ADMIN") {
    return res.status(400).json({
      success: false,
      message: "Admin account cannot be deactivated from this endpoint.",
    });
  }

  user.is_active = false;
  await user.save();

  res.json({
    success: true,
    message: "User deactivated successfully",
    data: user,
  });
};

exports.activateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.is_active = true;
  await user.save();

  res.json({
    success: true,
    message: "User activated successfully",
    data: user,
  });
};

exports.getBookingFullDetails = async (req, res) => {
  const booking = await EventBooking.findByPk(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found.",
    });
  }

  let eventParticipation = null;

  if (booking.event_type === "PRIVATE") {
    const guests = await Guest.findAll({
      where: { event_id: booking.id },
      order: [["id", "ASC"]],
    });

    const expectedGuestCount = booking.guest_count || 0;
    const actualGuestRecords = guests.length;

    let participationMessage = "";
    let participationStatus = "";

    if (actualGuestRecords === 0) {
      participationStatus = "GUEST_LIST_NOT_STARTED";
      participationMessage =
        "No guest details have been added yet. Please ask the customer to upload the guest list so invitations and reminders can be managed.";
    } else if (actualGuestRecords < expectedGuestCount) {
      participationStatus = "GUEST_LIST_INCOMPLETE";
      participationMessage =
        `Guest list is incomplete. ${actualGuestRecords} guest records have been added out of the expected ${expectedGuestCount}. Please ask the customer to add the remaining ${expectedGuestCount - actualGuestRecords} guest(s).`;
    } else if (actualGuestRecords === expectedGuestCount) {
      participationStatus = "GUEST_LIST_COMPLETE";
      participationMessage =
        "Guest list is complete and matches the expected guest count provided in the booking.";
    } else {
      participationStatus = "GUEST_LIST_EXCEEDED";
      participationMessage =
        `Guest list exceeds the expected booking count. ${actualGuestRecords} guest records have been added while the booking was created for ${expectedGuestCount} guests. Please review the booking scope and recalculate the estimated amount if required.`;
    }

    eventParticipation = {
      type: "PRIVATE_GUEST_LIST",
      status: participationStatus,
      expected_guest_count: expectedGuestCount,
      actual_guest_records_count: actualGuestRecords,
      message: participationMessage,
      records: guests,
    };
  }

  if (booking.event_type === "PUBLIC") {
    const attendees = await Attendee.findAll({
      where: { event_id: booking.id },
      order: [["id", "ASC"]],
    });

    const totalRegistered = attendees.length;

    let participationMessage = "";
    let participationStatus = "";

    if (totalRegistered === 0) {
      participationStatus = "REGISTRATION_NOT_STARTED";
      participationMessage =
        "No attendees have registered yet. Registrations are yet to begin or attendees have not signed up yet.";
    } else {
      participationStatus = "REGISTRATIONS_AVAILABLE";
      participationMessage =
        `Attendee registrations are available for this public event. Total registered attendees: ${totalRegistered}.`;
    }

    eventParticipation = {
      type: "PUBLIC_ATTENDEE_REGISTRATIONS",
      status: participationStatus,
      expected_attendance_or_capacity: booking.guest_count,
      total_registered_attendees: totalRegistered,
      message: participationMessage,
      records: attendees,
    };
  }

  const assignments = await EventAssignment.findAll({
    where: { event_id: booking.id },
    order: [["id", "ASC"]],
  });

  const assignmentSection = {
    total_assignments: assignments.length,
    message:
      assignments.length > 0
        ? "Vendor assignments are available for this booking."
        : "No vendors have been assigned yet. Admin action is required to allocate vendors for the requested services.",
    records: assignments,
  };

  return res.status(200).json({
    success: true,
    message: "Booking full details fetched successfully.",
    data: {
      booking_summary: booking,
      event_participation: eventParticipation,
      vendor_assignments: assignmentSection,
    },
  });
};