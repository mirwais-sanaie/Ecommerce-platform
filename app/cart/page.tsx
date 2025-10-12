"use client";

import { useCart } from "@/lib/store";
import ProductList from "../_components/layout/ProductList";

function CartPage() {
  const { carts } = useCart();
  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-12">
        Your favorite products
      </h1>
      <ProductList products={carts} />
    </div>
  );
}

export default CartPage;
