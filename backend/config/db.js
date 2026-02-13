const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Prefer remote DB if fully configured, otherwise fall back to local
let dbUrl;

if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
  dbUrl = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD,
  );
} else if (process.env.DATABASE_LOCAL) {
  dbUrl = process.env.DATABASE_LOCAL;
} else {
  throw new Error(
    "No database URL configured. Set DATABASE + DATABASE_PASSWORD or DATABASE_LOCAL in config.env",
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

module.exports = connectDB;
