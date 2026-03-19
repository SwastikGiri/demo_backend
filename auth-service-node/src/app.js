const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const vendorRoutes = require("./routes/vendor.routes");
const adminRoutes = require("./routes/admin.routes");
const bookingRoutes = require("./routes/booking.routes");
const guestRoutes = require("./routes/guest.routes");
const attendeeRoutes = require("./routes/attendee.routes");
const publicRoutes = require("./routes/public.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/public", publicRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Auth Service Running 🚀");
});

module.exports = app;