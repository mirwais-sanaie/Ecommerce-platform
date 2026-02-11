const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error("DATABASE and DATABASE_PASSWORD must be set in config.env");
}

const dbReplacerUrl = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    await mongoose.connect(dbReplacerUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
