const express = require("express");
const auth = require("../middleware/authMiddleware");
const Enquiry = require("../models/Enquiry");
const {
  getAllEnquiries,
  markContacted,
  deleteEnquiry
} = require("../controllers/enquiryController");

const router = express.Router();

/* ================= PUBLIC: SUBMIT ENQUIRY ================= */
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      interest: req.body.interest,
      message: req.body.message
    });

    await enquiry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ================= ADMIN: GET ALL ENQUIRIES ================= */
router.get("/", auth, getAllEnquiries);

/* ================= ADMIN: MARK CONTACTED ================= */
router.put("/:id/contacted", auth, markContacted);

/* ================= ADMIN: DELETE ================= */
router.delete("/:id", auth, deleteEnquiry);

module.exports = router;
