import Title from "./Title";
import ProductItem from "./ProductItem";
import { useShopContext } from "../contexts/ShopContext";

const BestSeller = () => {
  const { products } = useShopContext();
  //   const [selectedItem, setSelectedItem] = useState(null);

  const bestSeller = products
    ? products.filter((item) => item.bestseller).slice(0, 5)
    : [];

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          consequatur autem accusamus, cum deleniti a quos dicta repellendus
          harum ea. Laborum quisquam praesentium velit reprehenderit, deleniti
          debitis eum distinctio dolorum.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
