const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const VendorPricing = sequelize.define(
  "VendorPricing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tier: {
      type: DataTypes.ENUM("SIMPLE", "STANDARD", "PREMIUM", "LUXURY"),
      allowNull: false,
    },
    price_per_unit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "vendor_pricing",
    timestamps: false,
  }
);

module.exports = VendorPricing;