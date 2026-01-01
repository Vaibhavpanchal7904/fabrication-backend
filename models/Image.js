const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  category: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
