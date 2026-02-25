const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load env vars and DB config
dotenv.config({ path: "./config.env" });
const connectDB = require("./config/db");
const Product = require("./models/productModel");
const cloudinary = require("./config/cloudinary");

// Path to your products seed file (JSON array)
// We reuse the same products.json used in backend/data/
const PRODUCTS_FILE = path.join(__dirname, "data", "products.json");

// Folder where your frontend product images live.
// Adjust this if your path is different.
const FRONTEND_IMAGES_DIR = path.join(
  __dirname,
  "..",
  "AfroMart",
  "src",
  "assets",
  "frontend_assets",
);

const loadProductsFromFile = () => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    throw new Error(
      `Seed file not found at ${PRODUCTS_FILE}. Create products.json with an array of products.`,
    );
  }

  const fileData = fs.readFileSync(PRODUCTS_FILE, "utf-8");
  const json = JSON.parse(fileData);

  if (!Array.isArray(json)) {
    throw new Error("products.json must export an array of product objects");
  }

  return json;
};

const importData = async () => {
  try {
    await connectDB();
    const products = loadProductsFromFile();

    // Optional: clear existing products before import
    await Product.deleteMany();

    const docs = [];

    for (const p of products) {
      const { _id, bestseller, isBestSeller, imageFiles, image, ...rest } = p;

      const files = Array.isArray(imageFiles)
        ? imageFiles
        : Array.isArray(image)
          ? image
          : [];

      const uploadedUrls = [];

      for (const file of files) {
        if (!file) continue;

        // If it's already a URL, keep it
        if (/^https?:\/\//i.test(file)) {
          uploadedUrls.push(file);
          continue;
        }

        const localPath = path.join(FRONTEND_IMAGES_DIR, file);

        if (!fs.existsSync(localPath)) {
          console.warn(`⚠️  Image file not found on disk: ${localPath}`);
          continue;
        }

        const result = await cloudinary.uploader.upload(localPath, {
          folder: "afromart/products",
        });

        uploadedUrls.push(result.secure_url);
      }

      docs.push({
        ...rest,
        image: uploadedUrls,
        isBestSeller:
          typeof isBestSeller === "boolean" ? isBestSeller : !!bestseller,
      });
    }

    await Product.insertMany(docs);

    console.log(`✅ Imported ${docs.length} products with Cloudinary images.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await connectDB();
    const result = await Product.deleteMany();

    console.log(`🗑️  Deleted ${result.deletedCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error deleting data:", err.message);
    process.exit(1);
  }
};

const run = () => {
  const arg = process.argv[2];

  if (arg === "--import") {
    importData();
  } else if (arg === "--delete") {
    deleteData();
  } else {
    console.log(
      "Usage: node import-delete.js --import   # import products.json into DB",
    );
    console.log(
      "       node import-delete.js --delete   # delete ALL products from DB",
    );
    process.exit(0);
  }
};

run();

