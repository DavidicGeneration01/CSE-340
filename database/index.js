const { Pool } = require("pg");
require("dotenv").config();

// Render DB always needs SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // needed for Render
  },
});

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      if (process.env.NODE_ENV === "development") {
        console.log("Executed query:", text);
      }
      return res;
    } catch (err) {
      console.error("Database error:", err.message);
      throw err;
    }
  }
};
