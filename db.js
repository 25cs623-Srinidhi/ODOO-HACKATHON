const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "transitops_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true, // return DATE/DATETIME as strings instead of JS Date objects
});

// Quick sanity check on boot so a bad .env fails loudly instead of silently.
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected:", process.env.DB_NAME);
    conn.release();
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

module.exports = pool;
