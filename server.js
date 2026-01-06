const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================== CORS (FINAL FIX) ================== */
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://fabbbb.netlify.app",
    "https://durgafabrication.pages.dev",
    "https://fabrication-frontend.pages.dev"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ THIS LINE FIXES UPLOAD ISSUE
app.options("*", cors());
/* ====================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= HEALTH CHECK =================
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});
// ===============================================


app.get("/", (req, res) => {
  res.send("Fabrication World Backend Running 🚀");
});

// ROUTES
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
