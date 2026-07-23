require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.findOneAndUpdate(

        { username: "admin" },

        {
            username: "admin",
            password: hashedPassword
        },

        {
            upsert: true,
            new: true
        }

    );

    console.log("✅ Admin password updated successfully!");

    mongoose.connection.close();

})
.catch((err) => {

    console.error(err);

    mongoose.connection.close();

});