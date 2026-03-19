const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (data) => {
  let { full_name, email, password, phone } = data;

  // Normalize email
  email = email.toLowerCase();

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name,
    email,
    password_hash: hashedPassword,
    phone,
  });

  // Remove sensitive fields
  const userData = user.toJSON();
  delete userData.password_hash;

  return userData;
};

exports.loginUser = async (data) => {
  let { email, password } = data;

  email = email.toLowerCase();

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
  
  if (!user.is_active) {
    throw new Error(
      "Your account is inactive. Please contact support or admin.",
    );
  }
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  const userData = user.toJSON();
  delete userData.password_hash;

  return { user: userData, token };
};
