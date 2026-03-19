const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EventAssignment = sequelize.define("EventAssignment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  event_id: { type: DataTypes.INTEGER, allowNull: false },

  vendor_id: { type: DataTypes.INTEGER, allowNull: false },

  service_type: { type: DataTypes.STRING, allowNull: false },

  status: {
    type: DataTypes.ENUM("ASSIGNED", "ACCEPTED", "IN_PROGRESS", "COMPLETED"),
    defaultValue: "ASSIGNED",
  },

  rejection_reason: {
    type: DataTypes.STRING,
  },
});

module.exports = EventAssignment;