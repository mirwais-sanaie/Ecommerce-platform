const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
const products = require("./products.json");

dotenv.config({ path: "./config.env" });

// CONNECT DATABASE
const connectDB = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );

    const conn = await mongoose.connect(DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// IMPORT PRODUCTS
const importData = async () => {
  try {
    await Product.deleteMany(); // clear old data

    const formattedProducts = products.map((p) => {
      const { _id, bestseller, isBestSeller, ...rest } = p;

      return {
        ...rest,
        isBestSeller:
          typeof isBestSeller === "boolean" ? isBestSeller : !!bestseller,
      };
    });

    await Product.insertMany(formattedProducts);

    console.log(
      `✅ Products successfully imported: ${formattedProducts.length}`,
    );
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// DELETE PRODUCTS
const deleteData = async () => {
  try {
    const result = await Product.deleteMany();
    console.log(`🗑 Products deleted: ${result.deletedCount}`);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// COMMAND HANDLER
if (process.argv[2] === "--import") {
  connectDB().then(importData);
} else if (process.argv[2] === "--delete") {
  connectDB().then(deleteData);
}
