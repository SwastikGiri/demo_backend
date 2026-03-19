const EventOffering = require("../models/eventOffering.model");

// Public API (no login required)
exports.getAllOfferings = async (req, res) => {
  try {
    const offerings = await EventOffering.findAll({
      where: { is_active: true },
       attributes: ["id", "name", "category", "description"],
    });

    res.json({
      message: "Event offerings fetched successfully",
      offerings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching offerings",
    });
  }
};