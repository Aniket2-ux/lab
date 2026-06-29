// backend/src/createAdminUser.js

require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("./db");
const User = require("./models/User");

(async () => {
  try {
    console.log("🔌 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ Database connected");

    const email = "admin@gddiagnosticlab.com";
    const password = "admin@nepal987";

    const hashedPassword = await bcrypt.hash(password, 10);

    // Find existing admin by old or new email
    let user = await User.findOne({
      where: {
        email: [
          "admin@gmail.com",
          "admin@gddiagnosticlab.com",
        ],
      },
    });

    if (user) {
      user.name = "Admin";
      user.email = email;
      user.password = hashedPassword;
      user.role = "admin";

      await user.save();

      console.log("✅ Admin user updated");
    } else {
      user = await User.create({
        name: "Admin",
        email: email,
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin user created");
    }

    console.log({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();