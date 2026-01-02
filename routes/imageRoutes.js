const router = require("express").Router();
const Image = require("../models/Image");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ================= UPLOAD IMAGE (ADMIN) ================= */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const img = new Image({
      category: req.body.category,
      image: req.file.filename
    });
    await img.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

/* ================= GET ALL IMAGES (ADMIN TABLE) ================= */
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to load images" });
  }
});

/* ================= GET IMAGES BY CATEGORY (FRONTEND) ================= */
router.get("/:category", async (req, res) => {
  try {
    const images = await Image.find({ category: req.params.category });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to load category images" });
  }
});

/* ================= DELETE IMAGE (ADMIN) ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
