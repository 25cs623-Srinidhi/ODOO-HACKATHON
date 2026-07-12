const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/vehicles - list all vehicles
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vehicles ORDER BY vehicle_id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
});

// GET /api/vehicles/:id - single vehicle
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vehicles WHERE vehicle_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vehicle" });
  }
});

// POST /api/vehicles - create vehicle
router.post("/", verifyToken, async (req, res) => {
  const {
    registration_number,
    vehicle_name,
    vehicle_type,
    max_load_capacity,
    odometer,
    acquisition_cost,
    status,
  } = req.body;

  if (!registration_number) {
    return res.status(400).json({ message: "registration_number is required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO vehicles
        (registration_number, vehicle_name, vehicle_type, max_load_capacity, odometer, acquisition_cost, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        registration_number,
        vehicle_name || null,
        vehicle_type || null,
        max_load_capacity || null,
        odometer || null,
        acquisition_cost || null,
        status || "Available",
      ]
    );
    res.status(201).json({ vehicle_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Registration number already exists" });
    }
    res.status(500).json({ message: "Failed to create vehicle" });
  }
});

// PUT /api/vehicles/:id - update vehicle
router.put("/:id", verifyToken, async (req, res) => {
  const fields = [
    "registration_number",
    "vehicle_name",
    "vehicle_type",
    "max_load_capacity",
    "odometer",
    "acquisition_cost",
    "status",
  ];

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
      `UPDATE vehicles SET ${updates.join(", ")} WHERE vehicle_id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update vehicle" });
  }
});

// DELETE /api/vehicles/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM vehicles WHERE vehicle_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete vehicle (it may be referenced by trips/fuel/maintenance records)" });
  }
});

module.exports = router;
