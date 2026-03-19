const authService = require("../services/auth.service");
const vendorService = require("../services/vendor.service");
const { registerSchema, loginSchema } = require("../utils/validators");
const { directVendorRegisterSchema } = require("../utils/vendor.validator");

exports.register = async (req, res) => {
  try {
    // Validate input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const data = await authService.loginUser(req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerVendorWithUser = async (req, res) => {
  try {
    const { error } = directVendorRegisterSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const result = await vendorService.registerVendorWithUser(req.body);

    res.status(201).json({
      message: "Vendor registered successfully. Awaiting admin approval.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
