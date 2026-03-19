const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Strong password regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const seedAdmin = async () => {
  try {
    let adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminPhone = process.env.ADMIN_PHONE;

    // 🔴 Validate required env variables
    if (!adminEmail || !adminPassword || !adminName || !adminPhone) {
      throw new Error(
        "Missing ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME or ADMIN_PHONE in .env"
      );
    }

    // Normalize email
    adminEmail = adminEmail.toLowerCase();

    // 🔐 Validate password strength
    if (!passwordRegex.test(adminPassword)) {
      throw new Error(
        "Admin password must be strong (8 chars, uppercase, lowercase, number, special char)"
      );
    }

    // 📱 Validate phone
    if (!/^[0-9]{10}$/.test(adminPhone)) {
      throw new Error("Admin phone must be exactly 10 digits");
    }

    // Check existing admin
    const existingAdmin = await User.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    await User.create({
      full_name: adminName,
      email: adminEmail,
      password_hash: hashedPassword,
      role: "ADMIN",
      phone: adminPhone,
      is_active: true,
    });

    console.log("🔥 Admin created successfully");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1); // stop app if admin invalid
  }
};

module.exports = seedAdmin;