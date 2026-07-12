const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/drivers
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM drivers ORDER BY driver_id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
});

// GET /api/drivers/:id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM drivers WHERE driver_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ message: "Driver not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch driver" });
  }
});

// POST /api/drivers
router.post("/", verifyToken, async (req, res) => {
  const {
    driver_name,
    license_number,
    license_category,
    license_expiry,
    contact_number,
    safety_score,
    status,
  } = req.body;

  if (!driver_name || !license_number) {
    return res.status(400).json({ message: "driver_name and license_number are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO drivers
        (driver_name, license_number, license_category, license_expiry, contact_number, safety_score, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        driver_name,
        license_number,
        license_category || null,
        license_expiry || null,
        contact_number || null,
        safety_score || null,
        status || "Available",
      ]
    );
    res.status(201).json({ driver_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "License number already exists" });
    }
    res.status(500).json({ message: "Failed to create driver" });
  }
});

// PUT /api/drivers/:id
router.put("/:id", verifyToken, async (req, res) => {
  const fields = [
    "driver_name",
    "license_number",
    "license_category",
    "license_expiry",
    "contact_number",
    "safety_score",
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
      `UPDATE drivers SET ${updates.join(", ")} WHERE driver_id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Driver updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update driver" });
  }
});

// DELETE /api/drivers/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM drivers WHERE driver_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Driver deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete driver (it may be referenced by trips)" });
  }
});

// Bonus: mirrors your GetAvailableDrivers() stored procedure
router.get("/available/list", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("CALL GetAvailableDrivers()");
    res.json(rows[0]); // CALL returns nested result sets
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch available drivers" });
  }
});

module.exports = router;
