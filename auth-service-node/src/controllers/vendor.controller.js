const vendorService = require("../services/vendor.service");
const { vendorSchema } = require("../utils/vendor.validator");
const VendorProfile = require("../models/vendorProfile.model");
const EventAssignment = require("../models/eventAssignment.model");

exports.registerVendor = async (req, res) => {
  try {
    const { error } = vendorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const userId = req.user.id;

    const profile = await vendorService.createVendorProfile(
      userId,
      req.body
    );

    res.status(201).json({
      message: "Vendor profile submitted successfully. Awaiting admin review.",
      profile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAssignmentStatus = async (req, res) => {
  try{const { id } = req.params;
  const { status, rejection_reason } = req.body;

  const assignment = await EventAssignment.findByPk(id);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  
  if (assignment.vendor_id !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your own assignments.",
      });
    }

  if (status === "REJECTED" && !rejection_reason) {
    return res.status(400).json({
      message: "Rejection reason is required",
    });
  }

  assignment.status = status;
  assignment.rejection_reason = status === "REJECTED" ? rejection_reason : null;

  await assignment.save();

  res.json({
    message: "Assignment updated successfully",
  });} catch (error) {
    res.status(500).json({
      message: "Error updating assignment",
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await VendorProfile.findOne({
      where: { user_id: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    res.json({
      message: "Vendor profile fetched",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching vendor profile",
    });
  }
};

exports.getMyAssignments = async (req, res) => {
  try {
    const assignments = await EventAssignment.findAll({
      where: { vendor_id: req.user.id },
    });

    res.json({
      message: "Assignments fetched successfully",
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assignments",
    });
  }
};