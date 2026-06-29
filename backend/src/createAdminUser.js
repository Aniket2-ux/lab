// backend/src/createAdminUser.js

require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("./db");

// Register User model
require("./models/User");

async function main() {
  try {
    console.log("🔌 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ DB connected");

    const User = sequelize.models.User;

    if (!User) {
      throw new Error("User model not found");
    }

    const email = "admin@gmail.com";
    const password = "admin123";

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if user already exists
    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      user.name = "Admin";
      user.password = passwordHash;
      user.role = "admin";

      await user.save();

      console.log("✅ Admin user updated");
    } else {
      user = await User.create({
        name: "Admin",
        email,
        password: passwordHash,
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

    await sequelize.close();

    console.log("🎉 Done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();