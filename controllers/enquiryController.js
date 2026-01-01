const Enquiry = require("../models/Enquiry");

exports.getAllEnquiries = async (req, res) => {
  const data = await Enquiry.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.markContacted = async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, { contacted: true });
  res.json({ success: true });
};

exports.deleteEnquiry = async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
