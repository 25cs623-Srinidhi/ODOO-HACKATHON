const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/fuel - joined with vehicle info for display
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.fuel_log_id, f.vehicle_id, v.registration_number, v.vehicle_name,
              f.liters, f.cost, f.fuel_date
       FROM fuel_logs f
       LEFT JOIN vehicles v ON f.vehicle_id = v.vehicle_id
       ORDER BY f.fuel_log_id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch fuel logs" });
  }
});

// POST /api/fuel
router.post("/", verifyToken, async (req, res) => {
  const { vehicle_id, liters, cost, fuel_date } = req.body;

  if (!vehicle_id || !liters || !cost) {
    return res.status(400).json({ message: "vehicle_id, liters and cost are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO fuel_logs (vehicle_id, liters, cost, fuel_date) VALUES (?, ?, ?, ?)`,
      [vehicle_id, liters, cost, fuel_date || new Date().toISOString().slice(0, 10)]
    );
    res.status(201).json({ fuel_log_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create fuel log" });
  }
});

// PUT /api/fuel/:id
router.put("/:id", verifyToken, async (req, res) => {
  const fields = ["vehicle_id", "liters", "cost", "fuel_date"];
  const updates = [];
  const values = [];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  values.push(req.params.id);

  try {
    const [result] = await pool.query(
      `UPDATE fuel_logs SET ${updates.join(", ")} WHERE fuel_log_id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Fuel log not found" });
    res.json({ message: "Fuel log updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update fuel log" });
  }
});

// DELETE /api/fuel/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM fuel_logs WHERE fuel_log_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Fuel log not found" });
    res.json({ message: "Fuel log deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete fuel log" });
  }
});

module.exports = router;
