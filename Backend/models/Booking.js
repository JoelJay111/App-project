const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    repairType: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    problem: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Booking", bookingSchema);