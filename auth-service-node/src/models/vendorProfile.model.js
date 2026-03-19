const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const VendorProfile = sequelize.define(
  "VendorProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    approval_status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      defaultValue: "PENDING",
    },
    rejection_reason: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "vendor_profiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = VendorProfile;
