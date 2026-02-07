import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { useShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShopContext();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  /* ---------------- FETCH PRODUCT ---------------- */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (!products.length) return;

    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image?.[0] || "");
    }
  }, [productId, products]);

  /* ---------------- ADD TO CART ---------------- */

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    addToCart(
      productData._id,
      productData.name,
      productData.price,
      size,
      image,
      1
    );
    alert(`Added ${productData.name} (${size}) to cart!`);
  };

  /* ---------------- LOADING / ERROR ---------------- */

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-xl text-gray-500">Loading product...</div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="border-t-2 pt-10 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* IMAGES */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setImage(img)}
                className={`w-20 cursor-pointer border ${
                  img === image ? "border-black" : ""
                }`}
                alt={`Preview ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                className="w-3.5"
                alt="star"
              />
            ))}
            <img src={assets.star_dull_icon} className="w-3.5" alt="star" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* SIZE */}
          <div className="my-8">
            <p className="mb-2">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${
                    size === item ? "border-black bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-gray-500 mt-5 space-y-1 text-sm">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>7-day easy return policy.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-20">
        <div className="flex">
          <button className="border px-5 py-3 text-sm font-bold">
            Description
          </button>
          <button className="border px-5 py-3 text-sm">Reviews (122)</button>
        </div>

        <div className="border px-6 py-6 text-sm space-y-3">
          <p>An e-commerce website allows customers to buy products online.</p>
          <p>
            This product is crafted with high-quality materials and modern
            design.
          </p>
        </div>
      </div>

      {/* RELATED */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
