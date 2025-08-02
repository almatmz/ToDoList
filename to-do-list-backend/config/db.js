const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Force IPv4 connection
  host: process.env.DB_HOST || undefined, // Let it use the host from connection string
  family: 4, // Force IPv4
});

module.exports = pool;
