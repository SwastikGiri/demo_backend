const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EventBooking = sequelize.define(
  "EventBooking",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    customer_id: { type: DataTypes.INTEGER, allowNull: false },

    offering_id: { type: DataTypes.INTEGER },

    event_type: {
      type: DataTypes.ENUM("PUBLIC", "PRIVATE"),
      allowNull: false,
    },

    guest_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    selected_tier: {
      type: DataTypes.ENUM("SIMPLE", "STANDARD", "PREMIUM", "LUXURY"),
      allowNull: false,
    },

    total_estimated_cost: {
      type: DataTypes.FLOAT,
      decimal:(10, 2),
      allowNull: false,
    },

    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELLED"),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "event_bookings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = EventBooking;