const app = require("./src/app");
const { connectDB, sequelize } = require("./src/config/db");
const seedAdmin = require("./src/utils/seedAdmin");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  await sequelize.sync();

  // Seed admin
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
