const express = require("express");
const router = express.Router();

const guestController = require("../controllers/guest.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
// Customer adds guests to own private booking
router.post(
  "/",
  verifyToken,
  authorizeRoles("CUSTOMER", "ADMIN"),
  guestController.addGuests,
);
// Customer adds guests to own private booking
router.patch("/:id/rsvp", verifyToken, authorizeRoles("CUSTOMER", "ADMIN"), guestController.updateRSVP);

//Admin updates invitation status
router.patch(
  "/:id/invitation",
  verifyToken,
  authorizeRoles("ADMIN"),
  guestController.updateInvitationStatus,
);

module.exports = router;
