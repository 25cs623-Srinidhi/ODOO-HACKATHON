const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/trips - uses trip_details_view (already joins vehicle_name + driver_name)
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM trip_details_view ORDER BY trip_id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trips" });
  }
});

// GET /api/trips/:id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM trip_details_view WHERE trip_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ message: "Trip not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch trip" });
  }
});

// POST /api/trips - create a new trip (Draft by default)
router.post("/", verifyToken, async (req, res) => {
  const {
    vehicle_id,
    driver_id,
    source,
    destination,
    cargo_weight,
    planned_distance,
    status,
  } = req.body;

  if (!vehicle_id || !driver_id || !source || !destination) {
    return res
      .status(400)
      .json({ message: "vehicle_id, driver_id, source and destination are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO trips (vehicle_id, driver_id, source, destination, cargo_weight, planned_distance, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        vehicle_id,
        driver_id,
        source,
        destination,
        cargo_weight || null,
        planned_distance || null,
        status || "Draft",
      ]
    );
    res.status(201).json({ trip_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create trip" });
  }
});

// PUT /api/trips/:id - update trip (e.g. dispatch it, mark completed)
// NOTE: setting status to 'Dispatched' fires your existing DB triggers
// (vehicle_on_trip / driver_on_trip) which auto-update vehicle & driver status.
router.put("/:id", verifyToken, async (req, res) => {
  const fields = [
    "vehicle_id",
    "driver_id",
    "source",
    "destination",
    "cargo_weight",
    "planned_distance",
    "final_odometer",
    "fuel_consumed",
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
      `UPDATE trips SET ${updates.join(", ")} WHERE trip_id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update trip" });
  }
});

// DELETE /api/trips/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM trips WHERE trip_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete trip" });
  }
});

module.exports = router;
