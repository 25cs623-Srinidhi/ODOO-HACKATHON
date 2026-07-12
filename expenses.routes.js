const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// GET /api/expenses - joined with vehicle info
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT e.expense_id, e.vehicle_id, v.registration_number, v.vehicle_name,
              e.expense_type, e.amount, e.expense_date
       FROM expenses e
       LEFT JOIN vehicles v ON e.vehicle_id = v.vehicle_id
       ORDER BY e.expense_id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// POST /api/expenses
router.post("/", verifyToken, async (req, res) => {
  const { vehicle_id, expense_type, amount, expense_date } = req.body;

  if (!vehicle_id || !expense_type || !amount) {
    return res.status(400).json({ message: "vehicle_id, expense_type and amount are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO expenses (vehicle_id, expense_type, amount, expense_date) VALUES (?, ?, ?, ?)`,
      [vehicle_id, expense_type, amount, expense_date || new Date().toISOString().slice(0, 10)]
    );
    res.status(201).json({ expense_id: result.insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create expense" });
  }
});

// DELETE /api/expenses/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM expenses WHERE expense_id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

module.exports = router;
