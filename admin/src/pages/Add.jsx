import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const IMAGE_SLOTS = 4;
const SIZES = ["S", "M", "L", "XL", "XXL"];

const Add = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "Men",
      subCategory: "Topwear",
      price: "",
      sizes: [],
      isBestSeller: false,
    },
  });

  const [images, setImages] = useState(
    Array(IMAGE_SLOTS).fill({ file: null, preview: null, name: "" }),
  );

  // Handle image change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = {
        file,
        preview: reader.result,
        name:
          file.name.length > 15
            ? file.name.substring(0, 15) + "..."
            : file.name,
      };
      setImages(updatedImages);
    };
    reader.readAsDataURL(file);
  };

  // Handle size selection
  const toggleSize = (size) => {
    const currentSizes = watch("sizes");
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    setValue("sizes", updatedSizes);
  };

  // Submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("price", Number(data.price));
      formData.append("isBestSeller", data.isBestSeller);
      formData.append("sizes", JSON.stringify(data.sizes));

      images.forEach((img) => {
        if (img.file) {
          formData.append("image", img.file); // Must match backend
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      toast.success("Product added successfully!");

      // Reset form + images
      reset();
      setImages(
        Array(IMAGE_SLOTS).fill({ file: null, preview: null, name: "" }),
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-6 max-w-2xl mx-auto"
    >
      {/* Images */}
      <div>
        <p className="text-lg font-medium mb-2">Upload Images</p>
        <div className="flex flex-wrap gap-3">
          {images.map((img, index) => (
            <label key={index} className="cursor-pointer">
              <img
                src={img.preview || assets.upload_area}
                alt="upload"
                className="w-24 h-24 object-cover border rounded-md"
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
              <p className="text-sm text-center mt-1">
                {img.name || "Choose file"}
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <input
        {...register("name", { required: true })}
        placeholder="Product Name"
        className="input"
      />

      {/* Description */}
      <textarea
        {...register("description", { required: true })}
        rows="4"
        placeholder="Product Description"
        className="input"
      />

      {/* Category & Subcategory */}
      <div className="flex gap-4">
        <select {...register("category")} className="input">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select {...register("subCategory")} className="input">
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>

        <input
          type="number"
          min="0"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input"
        />
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {SIZES.map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 rounded cursor-pointer ${
                watch("sizes").includes(size)
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isBestSeller")} />
        Add to bestseller
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white py-2 rounded-md"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
