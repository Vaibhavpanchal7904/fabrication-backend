const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  getAllEnquiries,
  markContacted,
  deleteEnquiry
} = require("../controllers/enquiryController");

const router = express.Router();

router.get("/", auth, getAllEnquiries);
router.put("/:id/contacted", auth, markContacted);
router.delete("/:id", auth, deleteEnquiry);

module.exports = router;
