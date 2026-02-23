const User = require("../models/userModel");
const Product = require("../models/productModel");
const AppError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

const getUser = async (userId, next) => {
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return user;
};

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, size, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (size && !product.sizes.includes(size)) {
    return next(new AppError("Selected size is not available", 400));
  }

  const user = await getUser(req.user.id, next);

  const existingItem = user.cart.find(
    (item) =>
      item.product.toString() === productId &&
      (item.size || "") === (size || ""),
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    user.cart.push({
      product: productId,
      size,
      quantity: Number(quantity),
    });
  }

  await user.save();
  await user.populate("cart.product");

  res.status(200).json({
    status: "success",
    data: { cart: user.cart },
  });
});

exports.viewCart = catchAsync(async (req, res, next) => {
  const user = await getUser(req.user.id, next);

  await user.populate("cart.product");

  res.status(200).json({
    status: "success",
    results: user.cart.length,
    data: { cart: user.cart },
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const user = await getUser(req.user.id, next);

  const item = user.cart.id(req.params.itemId);
  if (!item) {
    return next(new AppError("Cart item not found", 404));
  }

  item.deleteOne(); // cleaner than remove()
  await user.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const user = await getUser(req.user.id, next);

  const item = user.cart.id(req.params.itemId);
  if (!item) {
    return next(new AppError("Cart item not found", 404));
  }

  const qty = Number(quantity);

  if (qty < 1) {
    item.deleteOne();
  } else {
    item.quantity = qty;
  }

  await user.save();
  await user.populate("cart.product");

  res.status(200).json({
    status: "success",
    data: { cart: user.cart },
  });
});
