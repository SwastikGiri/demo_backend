const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const adminController = require("../controllers/admin.controller");

router.get(
  "/vendors/pending",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getPendingVendors
);

router.patch(
  "/vendors/:id/approve",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.approveVendor
);

router.patch(
  "/vendors/:id/reject",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.rejectVendor
);

router.delete(
  "/users/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.deleteUser
);

router.post(
  "/offerings",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.createOffering
);

router.post(
  "/assign-vendor",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.assignVendor
);

router.get(
  "/events/:event_id/assignments",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getEventAssignments
);

router.get("/offerings", 
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getOfferings);

router.get(
  "/bookings",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getAllBookings
);
// Admin get booking details by id
router.get(
  "/bookings/:id/details",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getBookingFullDetails
);
router.get(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.getAllUsers
);

router.patch(
  "/users/:id/deactivate",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.deactivateUser
);

router.patch(
  "/users/:id/activate",
  verifyToken,
  authorizeRoles("ADMIN"),
  adminController.activateUser
);
module.exports = router;