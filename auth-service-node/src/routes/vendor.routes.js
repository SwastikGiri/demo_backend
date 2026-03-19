const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const vendorController = require("../controllers/vendor.controller");
const { authorizeRoles } = require("../middlewares/role.middleware");

// Register vendor
router.post(
  "/register",
  verifyToken,
  authorizeRoles("CUSTOMER"),
  vendorController.registerVendor
);

// Update assignment status (accept/reject)
router.patch(
  "/assignments/:id",
  verifyToken,
  authorizeRoles("VENDOR"),
  vendorController.updateAssignmentStatus
);

// Vendor assignments
router.get(
  "/assignments",
  verifyToken,
  authorizeRoles("VENDOR"),
  vendorController.getMyAssignments
);

// Get vendor profile
router.get(
  "/me",
  verifyToken,
  authorizeRoles("VENDOR"),
  vendorController.getMyProfile
);
module.exports = router;