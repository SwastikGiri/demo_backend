const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EventOffering = sequelize.define(
  "EventOffering",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Event name is required" },
      },
    },
    category: {
      type: DataTypes.ENUM(
        "WEDDING",
        "ENGAGEMENT",
        "BIRTHDAY",
        "ANNIVERSARY",
        "CORPORATE",
        "CONFERENCE",
        "SEMINAR",
        "WORKSHOP",
        "FESTIVAL",
        "PARTY",
        "BABY_SHOWER",
        "GRADUATION",
        "CUSTOM",
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [1], msg: "Base price must be greater than 0" },
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "event_offerings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = EventOffering;
