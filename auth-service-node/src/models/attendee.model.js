const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Attendee = sequelize.define(
  "Attendee",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    event_id: { type: DataTypes.INTEGER, allowNull: false },

    user_id: { type: DataTypes.INTEGER, allowNull: false },

    status: {
      type: DataTypes.ENUM("REGISTERED", "CHECKED_IN"),
      defaultValue: "REGISTERED",
    },
  },
  { tableName: "attendees", timestamps: false }
);

module.exports = Attendee;