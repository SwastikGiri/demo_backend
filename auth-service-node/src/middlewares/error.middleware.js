const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: err.errors[0].message,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      message: err.errors[0].message || "Duplicate value not allowed.",
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;