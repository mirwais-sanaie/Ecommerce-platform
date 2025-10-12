import { productType } from "@/types/projectTypes";
import Link from "next/link";
import ProductItem from "../ui/ProductItem";

function ProductList({ products }: { products: productType[] }) {
  return (
    <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
      {products?.map((product: productType) => (
        <Link key={product.id} href={`/shop/product/${product.id}`}>
          <ProductItem product={product} />
        </Link>
      ))}
    </ul>
  );
}

export default ProductList;
