// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("../config/db");

const authRoutes        = require("./routes/authRoutes");
const userRoutes        = require("./routes/userRoutes");
const itemRoutes        = require("./routes/itemRoutes");
const inventoryRoutes   = require("./routes/inventoryRoutes");
const billingRoutes     = require("./routes/billingRoutes");
const paymentRoutes     = require("./routes/paymentRoutes");
const reportRoutes      = require("./routes/reportRoutes");
const integrationRoutes = require("./routes/integrationRoutes");

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test DB connection
db.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Route mounts
app.use("/api/auth",         authRoutes);
app.use("/api/users",        userRoutes);
app.use("/api/items",        itemRoutes);
app.use("/api/inventory",    inventoryRoutes);
app.use("/api/billing",      billingRoutes);
app.use("/api/payments",     paymentRoutes);
app.use("/api/reports",      reportRoutes);
app.use("/api/integrations", integrationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("ERP Backend is Live ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});