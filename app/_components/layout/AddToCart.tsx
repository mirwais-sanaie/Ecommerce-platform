"use client";
import { useCart } from "@/lib/store";
import { Button } from "../ui/button";
import { productType } from "@/types/projectTypes";

function AddToCart({ product }: { product: productType }) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(product)} size="lg" className="mt-2">
      Add to Cart
    </Button>
  );
}

export default AddToCart;
