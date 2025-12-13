// backend/src/createAdminUser.js
require("dotenv").config();

const sequelize = require("./db");

// Ensure models are registered
require("./models/User");

async function main() {
  try {
    console.log("🔌 Connecting to database...");
    await sequelize.authenticate();
    console.log("✅ DB connected");

    const User = sequelize.models.User;

    if (!User) {
      throw new Error("User model not found on sequelize.models.User");
    }

    const email = "admin@gmail.com";

    // This is bcrypt hash for password: admin123
    const passwordHash =
      "$2b$10$u5DmV.4uaKfUZrituXHiAu3sdc1PS1ppqXeX6i1.Barq6KPtiUf7.";

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: "Admin",
        email,
        password: passwordHash,
        role: "admin",
      },
    });

    if (created) {
      console.log("✅ Admin user created:");
    } else {
      console.log("ℹ️ Admin user already existed:");
    }

    console.log({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    await sequelize.close();
    console.log("🔚 Done.");
  } catch (err) {
    console.error("❌ Error creating admin user:", err);
    process.exit(1);
  }
}

main();
