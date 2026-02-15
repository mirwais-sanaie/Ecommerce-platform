import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";

const Add = () => {
  // State to hold the image previews and names
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

  // Handle image selection and preview
  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      // Update the preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prevState) => ({
          ...prevState,
          [imageKey]: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      // Get the file name without extension and truncate if necessary
      const fileNameWithoutExtension = file.name.split(".")[0];
      const truncatedFileName =
        fileNameWithoutExtension.length > 12
          ? fileNameWithoutExtension.substring(0, 12) + "..."
          : fileNameWithoutExtension;

      // Set the truncated or full file name
      setImageNames((prevState) => ({
        ...prevState,
        [imageKey]: truncatedFileName,
      }));
    }
  };

  return (
    <form className="flex flex-col gap-4 p-6 max-w-2xl mx-auto">
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
                onChange={(e) => handleImageChange(e, imageKey)}
              />
              <p className="mt-2 text-sm text-center">
                {imageNames[imageKey] || "Choose a file"}
              </p>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-125 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="w-full mt-4">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-125 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400"
          rows="4"
          placeholder="Write here"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full sm:w-auto">
          <p className="mb-2">Product category</p>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="w-full sm:w-auto">
          <p className="mb-2">Sub category</p>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-400">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-30 border border-gray-300 rounded-md outline-none focus:border-gray-400"
            type="number"
            placeholder="25"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          <div className="bg-slate-200 px-3 py-1 cursor-pointer rounded hover:bg-slate-300 transition-colors">
            S
          </div>
          <div className="bg-slate-200 px-3 py-1 cursor-pointer rounded hover:bg-slate-300 transition-colors">
            M
          </div>
          <div className="bg-slate-200 px-3 py-1 cursor-pointer rounded hover:bg-slate-300 transition-colors">
            L
          </div>
          <div className="bg-slate-200 px-3 py-1 cursor-pointer rounded hover:bg-slate-300 transition-colors">
            XL
          </div>
          <div className="bg-slate-200 px-3 py-1 cursor-pointer rounded hover:bg-slate-300 transition-colors">
            XXL
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 cursor-pointer"
        />
        <label className="cursor-pointer text-sm" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
