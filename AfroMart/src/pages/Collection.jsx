import { useState } from "react";
import { useShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useShopContext();

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const filterProducts = (() => {
    let productsCpy = [...products];

    if (showSearch && search.trim() !== "") {
      const searchText = search.toLowerCase();

      productsCpy = productsCpy.filter((p) =>
        p.name.toLowerCase().includes(searchText)
      );
    }

    if (category.length > 0) {
      productsCpy = productsCpy.filter((p) => category.includes(p.category));
    }

    if (subCategory.length > 0) {
      productsCpy = productsCpy.filter((p) =>
        subCategory.includes(p.subCategory)
      );
    }

    /* -------- SORTING -------- */

    if (sortType === "low-high") {
      productsCpy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productsCpy.sort((a, b) => b.price - a.price);
    }

    if (sortType === "newest") {
      productsCpy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return productsCpy;
  })();

  /* ---------------- UI ---------------- */

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* LEFT FILTERS */}
      <div className="min-w-60 px-4 sm:px-0">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:cursor-default"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${
              showFilter ? "rotate-90" : ""
            }`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* CATEGORY */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="w-4 h-4"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                  className="w-4 h-4"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-3 py-2 rounded"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
