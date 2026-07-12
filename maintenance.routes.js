const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/maintenance - joined with vehicle info for display
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.maintenance_id, m.vehicle_id, v.registration_number, v.vehicle_name,
              m.maintenance_type, m.maintenance_date, m.cost, m.status
       FROM maintenance_logs m
       LEFT JOIN vehicles v ON m.vehicle_id = v.vehicle_id
       ORDER BY m.maintenance_id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch maintenance logs" });
  }
});

// POST /api/maintenance
router.post("/", verifyToken, async (req, res) => {
  const { vehicle_id, maintenance_type, maintenance_date, cost, status } = req.body;

  if (!vehicle_id || !maintenance_type) {
    return res.status(400).json({ message: "vehicle_id and maintenance_type are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO maintenance_logs (vehicle_id, maintenance_type, maintenance_date, cost, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        vehicle_id,
        maintenance_type,
        maintenance_date || new Date().toISOString().slice(0, 10),
        cost || null,
        status || "Active",
      ]
    );
    res.status(201).json({ maintenance_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create maintenance log" });
  }
});

// PUT /api/maintenance/:id
router.put("/:id", verifyToken, async (req, res) => {
  const fields = ["vehicle_id", "maintenance_type", "maintenance_date", "cost", "status"];
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
      `UPDATE maintenance_logs SET ${updates.join(", ")} WHERE maintenance_id = ?`,
      values
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance log not found" });
    res.json({ message: "Maintenance log updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update maintenance log" });
  }
});

// DELETE /api/maintenance/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM maintenance_logs WHERE maintenance_id = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Maintenance log not found" });
    res.json({ message: "Maintenance log deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete maintenance log" });
  }
});

module.exports = router;
