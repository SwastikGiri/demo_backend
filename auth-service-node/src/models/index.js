const User = require("./user.model");
const VendorProfile = require("./vendorProfile.model");
const VendorPricing = require("./vendorPricing.model");
const EventOffering = require("./eventOffering.model");
const EventBooking = require("./eventBooking.model");
const Guest = require("./guest.model");
const Attendee = require("./attendee.model");

// User ↔ VendorProfile
User.hasOne(VendorProfile, { foreignKey: "user_id" });
VendorProfile.belongsTo(User, { foreignKey: "user_id" });

// VendorProfile ↔ VendorPricing
VendorProfile.hasMany(VendorPricing, { foreignKey: "vendor_id" });
VendorPricing.belongsTo(VendorProfile, { foreignKey: "vendor_id" });

// Offering → Booking
EventOffering.hasMany(EventBooking, { foreignKey: "offering_id" });
EventBooking.belongsTo(EventOffering, { foreignKey: "offering_id" });

// Booking → Guests
EventBooking.hasMany(Guest, { foreignKey: "event_id" });
Guest.belongsTo(EventBooking, { foreignKey: "event_id" });

// Booking → Attendees
EventBooking.hasMany(Attendee, { foreignKey: "event_id" });
Attendee.belongsTo(EventBooking, { foreignKey: "event_id" });

module.exports = {
  User,
  VendorProfile,
  VendorPricing,
  EventOffering,
  EventBooking,
  Guest,
  Attendee,
};
