require("dotenv").config();

console.log(process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Booking = require("./models/Booking");
const Admin = require("./models/Admin");

const app = express();
const PORT = process.env.PORT || 3000;

// =============================
// MIDDLEWARE
// =============================
app.use(cors());
app.use(express.json());

// =============================
// CONNECT TO MONGODB
// =============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.error(err);
  });

// =============================
// HOME ROUTE
// =============================
app.get("/", (req, res) => {
  res.send("Welcome to the FixLab Backend API!");
});

// =============================
// CREATE BOOKING
// =============================
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.status(201).json({
      message: "Booking received successfully!",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save booking.",
      error: error.message,
    });
  }
});


// Delete Booking
app.delete("/api/bookings/:id", async (req, res) => {

    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            message: "Booking deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// =============================
// GET ALL BOOKINGS
// =============================
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
});

// =============================
// ADMIN LOGIN
// =============================
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =============================
// START SERVER
// =============================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});