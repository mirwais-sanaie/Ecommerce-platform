const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(cartController.viewCart).post(cartController.addToCart);

router
  .route("/:itemId")
  .delete(cartController.removeFromCart)
  .patch(cartController.updateQuantity);

module.exports = router;
