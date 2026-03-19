const User = require("../models/user.model");
const VendorProfile = require("../models/vendorProfile.model");
const VendorPricing = require("../models/vendorPricing.model");
const bcrypt = require("bcrypt");

exports.registerVendorWithUser = async (data) => {
  const {
    full_name,
    email,
    password,
    phone,
    business_name,
    service_type,
    description,
    pricing,
  } = data;

  // Normalize email
  const normalizedEmail = email.toLowerCase();

  // Check existing user
  const existingUser = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new Error("Email already registered. Please login and apply as vendor.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    full_name,
    email: normalizedEmail,
    password_hash: hashedPassword,
    phone,
    role: "CUSTOMER", // will upgrade after approval
  });

  // Create vendor profile
  const vendorProfile = await VendorProfile.create({
    user_id: user.id,
    business_name,
    service_type,
    description,
  });

  // Create pricing
  if (pricing && pricing.length > 0) {
    const pricingData = pricing.map((p) => ({
      vendor_id: vendorProfile.id,
      tier: p.tier,
      price_per_unit: p.price_per_unit,
    }));

    await VendorPricing.bulkCreate(pricingData);
  }

  return { user, vendorProfile };
};

exports.createVendorProfile = async (userId, data) => {
  const { business_name, service_type, description, pricing } = data;

  const existing = await VendorProfile.findOne({
    where: { user_id: userId },
  });

  // CASE 1: First-time application
  if (!existing) {
    const profile = await VendorProfile.create({
      user_id: userId,
      business_name,
      service_type,
      description,
      approval_status: "PENDING",
    });

    if (pricing?.length) {
      const pricingData = pricing.map((p) => ({
        vendor_id: profile.id,
        tier: p.tier,
        price_per_unit: p.price_per_unit,
      }));

      await VendorPricing.bulkCreate(pricingData);
    }

    return profile;
  }

  // CASE 2: Already applied
  if (existing.approval_status === "PENDING") {
    throw new Error("Your vendor application is already under review.");
  }

  if (existing.approval_status === "APPROVED") {
    throw new Error("You are already an approved vendor.");
  }

  // CASE 3: REAPPLY (REJECTED → PENDING)
  if (existing.approval_status === "REJECTED") {
    existing.business_name = business_name;
    existing.service_type = service_type;
    existing.description = description;
    existing.approval_status = "PENDING";

    await existing.save();

    // 🔁 Replace pricing
    await VendorPricing.destroy({
      where: { vendor_id: existing.id },
    });

    if (pricing?.length) {
      const pricingData = pricing.map((p) => ({
        vendor_id: existing.id,
        tier: p.tier,
        price_per_unit: p.price_per_unit,
      }));

      await VendorPricing.bulkCreate(pricingData);
    }

    return existing;
  }
};
