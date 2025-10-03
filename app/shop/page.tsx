import { productType } from "@/types/projectTypes";
import ProductItem from "../_components/ui/ProductItem";
import Link from "next/link";

function page() {
  const products = [
    {
      id: 1,
      title: "chair",
      price: 21,
      description: "Charis is good",
      imageUrl: "",
    },
    {
      id: 2,
      title: "book",
      price: 21,
      description: "book is good",
      imageUrl: "",
    },
    {
      id: 3,
      title: "notebook",
      price: 21,
      description: "notebook is good",
      imageUrl: "",
    },
    {
      id: 4,
      title: "speaker",
      price: 21,
      description: "speaker is good",
      imageUrl: "",
    },
  ];
  return (
    <div className="m-10">
      <h1>Shop page</h1>
      <ul>
        {products?.map((product: productType) => (
          <Link key={product.id} href={`/shop/product/${product.id}`}>
            <ProductItem product={product} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default page;
