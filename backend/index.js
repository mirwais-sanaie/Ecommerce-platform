const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
