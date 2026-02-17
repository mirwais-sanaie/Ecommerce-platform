const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/apiError");
const streamifier = require("streamifier");

// Helper function to upload a single image buffer to Cloudinary
const uploadImageToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

exports.createProduct = catchAsync(async (req, res, next) => {
  // With upload.array(), files are in req.files
  if (!req.files || req.files.length === 0) {
    return next(new AppError("At least one image is required", 400));
  }

  // Upload all images to Cloudinary
  const imageUrls = await Promise.all(
    req.files.map((file) => uploadImageToCloudinary(file.buffer)),
  );

  // Parse sizes
  let sizesArray = req.body.sizes;
  if (typeof sizesArray === "string") {
    try {
      sizesArray = JSON.parse(sizesArray);
    } catch (e) {
      sizesArray = sizesArray.split(",").map((s) => s.trim());
    }
  }

  // Parse bestseller
  let bestsellerValue = req.body.bestseller;
  if (typeof bestsellerValue === "string") {
    bestsellerValue = bestsellerValue === "true" || bestsellerValue === "1";
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description ?? "",
    price: parseFloat(req.body.price),
    category: (req.body.category ?? "").trim(),
    subCategory: (req.body.subCategory ?? "").trim(),
    sizes: sizesArray || [],
    bestseller: bestsellerValue ?? false,
    image: imageUrls,
    date: Date.now(),
  });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const updateData = { ...req.body };

  // Handle image updates
  if (req.file) {
    const imageUrl = await uploadImageToCloudinary(req.file.buffer);
    updateData.image = [imageUrl];
  } else if (req.files && req.files.image && Array.isArray(req.files.image)) {
    const uploadedUrls = await Promise.all(
      req.files.image.map((file) => uploadImageToCloudinary(file.buffer)),
    );
    updateData.image = uploadedUrls;
  }

  // Parse sizes if provided as string
  if (updateData.sizes && typeof updateData.sizes === "string") {
    try {
      updateData.sizes = JSON.parse(updateData.sizes);
    } catch (e) {
      updateData.sizes = updateData.sizes.split(",").map((s) => s.trim());
    }
  }

  // Parse bestseller if provided as string
  if (updateData.bestseller && typeof updateData.bestseller === "string") {
    updateData.bestseller =
      updateData.bestseller === "true" || updateData.bestseller === "1";
  }

  // Parse price if provided as string
  if (updateData.price && typeof updateData.price === "string") {
    updateData.price = parseFloat(updateData.price);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
