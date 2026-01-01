const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");





dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Fabrication World Backend Running 🚀");
});

// ROUTES
const enquiryRoutes = require("./routes/enquiryRoutes");
const adminRoutes = require("./routes/adminRoutes"); 
const imageRoutes=require("./routes/imageRoutes")// ✅ ADD THIS

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes); // ✅ ADD THIS
app.use("/api/images", imageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
