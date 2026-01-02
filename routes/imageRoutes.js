const router = require("express").Router();
const Image = require("../models/Image");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadCloudinary");


/* ================= UPLOAD IMAGE (ADMIN) ================= */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    console.log("==== UPLOAD START ====");
    console.log("REQ.FILE:", req.file);
    console.log("REQ.BODY:", req.body);

    const img = new Image({
      category: req.body.category,
      image: req.file.path
    });

    await img.save();
    res.json({ success: true, file: req.file });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
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
