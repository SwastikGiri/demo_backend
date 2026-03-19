const express = require("express");
const router = express.Router();

const publicController = require("../controllers/public.controller");

router.get("/offerings", publicController.getAllOfferings);

module.exports = router;