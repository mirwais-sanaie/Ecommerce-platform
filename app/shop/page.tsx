import { productType } from "@/types/projectTypes";
import ProductItem from "../_components/ui/ProductItem";
import Link from "next/link";

const page = async () => {
  const res = await fetch("http://localhost:8000/products");
  const products = await res.json();

  return (
    <div className="m-10">
      <h1>Shop page</h1>
      <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
        {products?.map((product: productType) => (
          <Link key={product.id} href={`/shop/product/${product.id}`}>
            <ProductItem product={product} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default page;
