const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

dotenv.config();



// 🔥 FORCE cloudinary to load
require("./config/cloudinary");
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected for Admin Script ✅");

    const email = "nimeshpanchal@gmail.com";
    const password = "Admin@123";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("Admin already exists ✅");
      process.exit(0);
    }

    const admin = new Admin({
      email,
      password
    });

    await admin.save();
    console.log("Admin created successfully ✅");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
