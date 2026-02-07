import { useEffect, useState } from "react";
import { useShopContext } from "../contexts/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function RelatedProducts({ category, subCategory }) {
  const { products } = useShopContext();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products.length) return;

    let filtered = products.filter(
      (item) => item.category === category && item.subCategory === subCategory,
    );

    // remove duplicates or current product if needed later
    setRelated(filtered.slice(0, 4));
  }, [products, category, subCategory]);

  if (!related.length) return null;

  return (
    <div className="mt-20">
      <Title text1="RELATED" text2="PRODUCTS" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
