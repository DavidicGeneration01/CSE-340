// database/index.js
const { Pool } = require("pg");
require("dotenv").config();

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Create a pool with SSL required (needed for Render Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Keep this for Render
});

// Export a query method for all database access
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);

      // Only log queries in development to reduce noise
      if (process.env.NODE_ENV === "development") {
        console.log("Executed query:", { text });
      }

      return res;
    } catch (error) {
      console.error("Database error:", error.message);
      throw error;
    }
  },
};
