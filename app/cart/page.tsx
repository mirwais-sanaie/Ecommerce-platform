"use client";

import { useCart } from "@/lib/store";
import ProtectedRoute from "@/app/_components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/utils/helper";

export default function CartPage() {
  const {
    carts,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
  } = useCart();
  const totalPrice = carts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (carts.length === 0)
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty 🛒</h1>
          <Link href="/shop">
            <Button>Go Shopping</Button>
          </Link>
        </div>
      </ProtectedRoute>
    );

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Your Cart 🛍️</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {carts.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={90}
                    height={90}
                    className="rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <p className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}$
                  </p>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>

            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p className="text-gray-500">Free</p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold mb-6">
              <p>Total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
