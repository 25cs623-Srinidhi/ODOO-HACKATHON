require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const vehicleRoutes = require("./routes/vehicles.routes");
const driverRoutes = require("./routes/drivers.routes");
const tripRoutes = require("./routes/trips.routes");
const fuelRoutes = require("./routes/fuel.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const expenseRoutes = require("./routes/expenses.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",");

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "transitops-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (catches anything thrown outside try/catch)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 TransitOPS backend running on http://localhost:${PORT}`);
});
