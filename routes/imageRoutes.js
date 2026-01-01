const router = require("express").Router();
const Image = require("../models/Image");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const img = new Image({
    category: req.body.category,
    image: req.file.filename
  });
  await img.save();
  res.json({ success: true });
});

router.get("/:category", async (req, res) => {
  const images = await Image.find({ category: req.params.category });
  res.json(images);
});

module.exports = router;
