const express = require("express");
const upload = require("../middlewares/upload");

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Support both single image (upload.single) and multiple images (upload.array)
router.route("/").post(upload.single("image"), createProduct).get(getAllProducts);

router
  .route("/:id")
  .get(getProduct)
  .patch(upload.single("image"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
