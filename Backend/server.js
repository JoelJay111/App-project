const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;


// Middleware
app.use(cors());
app.use(express.json());



// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the FixLab Backend API!");
});

// =============================
// BOOKINGS ROUTE
// =============================

// Temporary storage
const bookings = [];

// Create Booking
app.post("/api/bookings", (req, res) => {

    const booking = req.body;

    bookings.push(booking);

    res.status(201).json({
        message: "Booking received successfully!",
        booking: booking
    });

});

// Get All Bookings
app.get("/api/bookings", (req, res) => {

    res.json(bookings);

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});