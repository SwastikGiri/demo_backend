const express = require("express");
const router = express.Router();

const attendeeController = require("../controllers/attendee.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");
// Logged-in users register as attendees for public events
router.post("/", verifyToken, authorizeRoles("CUSTOMER", "ADMIN","VENDOR"), attendeeController.registerAttendee);

module.exports = router;