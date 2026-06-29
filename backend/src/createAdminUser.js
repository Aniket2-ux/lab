require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("./db");
require("./models/User");

async function main() {
  try {
    await sequelize.authenticate();

    const User = sequelize.models.User;

    const email = "admin@gmail.com";
    const password = "admin123";

    const hash = await bcrypt.hash(password, 10);

    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      user.password = hash;
      user.name = "Admin";
      user.role = "admin";
      await user.save();

      console.log("✅ Password updated");
    } else {
      await User.create({
        name: "Admin",
        email,
        password: hash,
        role: "admin",
      });

      console.log("✅ User created");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();