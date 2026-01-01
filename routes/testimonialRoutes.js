const express = require("express");
const auth = require("../middleware/authMiddleware");
const Testimonial = require("../models/Testimonial");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Testimonial.create(req.body);
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  res.json(await Testimonial.find());
});

module.exports = router;
