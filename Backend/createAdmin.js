require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({

        username: "admin",

        password: hashedPassword

    });

    await admin.save();

    console.log("✅ Admin created successfully!");

    process.exit();

})
.catch((err) => {

    console.log(err);

    process.exit();

});