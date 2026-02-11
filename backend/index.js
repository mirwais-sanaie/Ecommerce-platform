const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");
const userRoute = require("./routes/userRoute");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRoute);

module.exports = app;
