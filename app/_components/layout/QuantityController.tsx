"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";

export default function QuantityController() {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={decrease}
        className="rounded-full"
      >
        –
      </Button>

      <span className="text-xl font-semibold w-6 text-center">{quantity}</span>

      <Button
        variant="outline"
        size="icon"
        onClick={increase}
        className="rounded-full"
      >
        +
      </Button>
    </div>
  );
}
