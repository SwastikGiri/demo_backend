const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Guest = sequelize.define(
  "Guest",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    event_id: { type: DataTypes.INTEGER, allowNull: false },

    name: { type: DataTypes.STRING, allowNull: false },

    email: { type: DataTypes.STRING },

    phone: { type: DataTypes.STRING },

    invitation_status: {
      type: DataTypes.ENUM("PENDING", "SENT", "ACCEPTED", "DECLINED"),
      defaultValue: "PENDING",
    },
    rsvp_status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "DECLINED"),
      defaultValue: "PENDING",
    },
  },
  { tableName: "guests", timestamps: false },
);

module.exports = Guest;
