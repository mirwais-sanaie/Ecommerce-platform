import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";

const Add = () => {
  // Store actual files
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Store previews
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [imageNames, setImageNames] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Men");
  const [productSubCategory, setProductSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);

  // Handle image selection
  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }

    // Store actual file
    setImageFiles((prev) => ({
      ...prev,
      [imageKey]: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [imageKey]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    // Store truncated name
    const fileNameWithoutExtension = file.name.split(".")[0];
    const truncatedFileName =
      fileNameWithoutExtension.length > 12
        ? fileNameWithoutExtension.substring(0, 12) + "..."
        : fileNameWithoutExtension;

    setImageNames((prev) => ({
      ...prev,
      [imageKey]: truncatedFileName,
    }));
  };

  const handleSizeSelection = (size) => {
    setProductSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((item) => item !== size)
        : [...prevSizes, size],
    );
  };

  //submit form data
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("category", productCategory);
    formData.append("subCategory", productSubCategory);
    formData.append("price", Number(productPrice));
    formData.append("isBestSeller", isBestSeller);
    formData.append("sizes", JSON.stringify(productSizes));

    // Append images (important: field name must match backend)
    Object.values(imageFiles).forEach((file) => {
      if (file) {
        formData.append("image", file);
      }
    });

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/products",
        {
          method: "POST",
          body: formData, // 🚀 No JSON, no headers
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      console.log("Product added:", data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-6 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Image upload section */}
      <div>
        <p className="text-lg font-medium mb-2">Upload Images</p>
        <div className="flex flex-wrap gap-3">
          {["image1", "image2", "image3", "image4"].map((imageKey, index) => (
            <label htmlFor={imageKey} key={index} className="cursor-pointer">
              <img
                src={imagePreviews[imageKey] || assets.upload_area}
                alt={`Upload area ${index + 1}`}
                className="w-24 h-24 object-cover border border-gray-300 rounded-md hover:border-gray-400"
              />
              <input
                type="file"
                id={imageKey}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, imageKey)}
              />
              <p className="mt-2 text-sm text-center">
                {imageNames[imageKey] || "Choose a file"}
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* Product name */}
      <div>
        <p className="mb-2">Product name</p>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="4"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>

      {/* Category, subcategory, price */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select
          value={productSubCategory}
          onChange={(e) => setProductSubCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>

        <input
          type="number"
          min="0"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Price"
          className="px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              className={`px-3 py-1 rounded cursor-pointer ${
                productSizes.includes(size)
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={isBestSeller}
          onChange={(e) => setIsBestSeller(e.target.checked)}
        />
        <label>Add to bestseller</label>
      </div>

      <button
        type="submit"
        className="w-32 py-2 bg-black text-white rounded-md"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
