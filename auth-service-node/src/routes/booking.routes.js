const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const bookingController = require("../controllers/booking.controller");
const { authorizeRoles } = require("../middlewares/role.middleware");
// Customer/Admin booking create
router.post(
  "/",
  verifyToken,
  authorizeRoles("CUSTOMER", "ADMIN"),
  bookingController.createBooking,
);
// Customer get estimate for booking
router.post("/estimate", verifyToken, bookingController.getEstimate);
router.get(
  "/my",
  verifyToken,
  authorizeRoles("CUSTOMER", "ADMIN"),
  bookingController.getMyBookings,
);
//get booking by id - Admin only
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  bookingController.getBookingById
);
module.exports = router;
