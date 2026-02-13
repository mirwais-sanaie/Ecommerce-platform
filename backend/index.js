const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectDB = require("./config/db");
// Require to ensure Cloudinary is configured once at startup
require("./config/cloudinary");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

// Global error handler (must be after all routes)
const errorHandler = require("./utils/errorHandler");
app.use(errorHandler);

module.exports = app;
