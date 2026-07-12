const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/dashboard/summary - powers DashboardCards
router.get("/summary", verifyToken, async (req, res) => {
  try {
    const [[vehicleCounts]] = await pool.query(
      `SELECT COUNT(*) AS total_vehicles,
              SUM(status = 'Available') AS available_vehicles,
              SUM(status = 'On Trip') AS vehicles_on_trip,
              SUM(status = 'In Shop') AS vehicles_in_shop
       FROM vehicles`
    );

    const [[driverCounts]] = await pool.query(
      `SELECT COUNT(*) AS total_drivers,
              SUM(status = 'Available') AS available_drivers,
              SUM(status = 'On Trip') AS drivers_on_trip
       FROM drivers`
    );

    const [[tripCounts]] = await pool.query(
      `SELECT COUNT(*) AS total_trips,
              SUM(status = 'Dispatched') AS dispatched_trips,
              SUM(status = 'Completed') AS completed_trips,
              SUM(status = 'Draft') AS draft_trips
       FROM trips`
    );

    const [[fuelTotals]] = await pool.query(
      `SELECT COALESCE(SUM(liters), 0) AS total_liters, COALESCE(SUM(cost), 0) AS total_fuel_cost
       FROM fuel_logs`
    );

    const [[maintenanceTotals]] = await pool.query(
      `SELECT COUNT(*) AS total_maintenance, SUM(status = 'Active') AS active_maintenance
       FROM maintenance_logs`
    );

    res.json({
      vehicles: vehicleCounts,
      drivers: driverCounts,
      trips: tripCounts,
      fuel: fuelTotals,
      maintenance: maintenanceTotals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
});

// GET /api/dashboard/vehicle-distribution - powers Analytics.jsx Bar chart
router.get("/vehicle-distribution", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT vehicle_type, COUNT(*) AS count FROM vehicles GROUP BY vehicle_type`
    );
    res.json({
      labels: rows.map((r) => r.vehicle_type),
      data: rows.map((r) => r.count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicle distribution" });
  }
});

// GET /api/dashboard/fuel-usage - powers Analytics.jsx Pie chart
router.get("/fuel-usage", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT v.vehicle_type, SUM(f.liters) AS total_liters
       FROM fuel_logs f
       JOIN vehicles v ON f.vehicle_id = v.vehicle_id
       GROUP BY v.vehicle_type`
    );
    res.json({
      labels: rows.map((r) => r.vehicle_type),
      data: rows.map((r) => Number(r.total_liters)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch fuel usage" });
  }
});

module.exports = router;
