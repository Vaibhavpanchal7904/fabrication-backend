const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Testimonial",
  new mongoose.Schema({
    name: String,
    message: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
  })
);
