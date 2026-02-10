const mongoose = require("mongoose");

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
