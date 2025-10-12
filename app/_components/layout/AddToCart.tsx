"use client";
import { useCart } from "@/lib/store";
import { Button } from "../ui/button";
import { productType } from "@/types/projectTypes";

function AddToCart({ product }: { product: productType }) {
  const { addToCart, carts } = useCart();

  const ifExistsProduct = (productId: number) => {
    return carts?.some((item) => item.id === productId);
  };

  const exists = ifExistsProduct(product.id);

  return (
    <>
      {exists ? (
        <Button disabled size="lg" className="mt-2">
          Already in Cart
        </Button>
      ) : (
        <Button onClick={() => addToCart(product)} size="lg" className="mt-2">
          Add to Cart
        </Button>
      )}
    </>
  );
}

export default AddToCart;
