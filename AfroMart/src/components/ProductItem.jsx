import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useShopContext();

  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <Link className="text-gray-700 cursor-pointer block" to={`/product/${id}`}>
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover hover:scale-110 transition ease-in-out"
          loading="lazy"
          decoding="async"
          src={imageUrl}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-2">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
