const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

// Accessible by any logged-in user
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "User profile accessed",
    user: req.user,
  });
});

// Admin only
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;