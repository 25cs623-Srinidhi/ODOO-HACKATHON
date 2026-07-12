const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// POST /api/auth/login
// NOTE: your current `users` table stores plain-text passwords
// (e.g. 'admin123'). This route matches that as-is so it works
// out of the box with your existing data dump. Before going anywhere
// near production, switch to bcrypt-hashed passwords (see comment below).
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.user_id, u.full_name, u.email, u.password, u.role_id, r.role_name
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.role_id
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Plain-text check to match your current data. To upgrade to bcrypt:
    //   const bcrypt = require('bcrypt');
    //   const ok = await bcrypt.compare(password, user.password);
    const passwordMatches = password === user.password;

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    res.json({
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
