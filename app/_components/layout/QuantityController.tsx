"use client";

import { Button } from "@/app/_components/ui/button";
import { useCart } from "@/lib/store";

export default function QuantityController({
  productId,
}: {
  productId: number;
}) {
  console.log(productId);
  const { carts, increaseQuantity, decreaseQuantity } = useCart();
  const product = carts.find((item) => item.id === productId);
  if (!product) return null;
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => decreaseQuantity(product.id)}
        className="rounded-full"
      >
        –
      </Button>

      <span className="text-xl font-semibold w-6 text-center">
        {product.quantity}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => increaseQuantity(product.id)}
        className="rounded-full"
      >
        +
      </Button>
    </div>
  );
}
