import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

function Cart() {
  const {
    cartItems,
    currency,
    deliveryFee,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    getCartTotalCount,
  } = useShopContext();

  const subtotal = getCartSubtotal();
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Add items from our collections to get started.
        </p>
        <Link
          to="/collections"
          className="inline-block bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
        >
          SHOP COLLECTIONS
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-0">
      <h1 className="text-2xl font-medium mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* CART ITEMS */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 sm:gap-6 border-b pb-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-gray-100 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm sm:text-base">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>
                <p className="text-sm font-medium mt-2">
                  {currency}
                  {item.price}
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="flex items-center gap-1 text-gray-500 hover:text-red-600 text-sm"
                  >
                    <img src={assets.bin_icon} alt="Remove" className="w-4" />
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-medium text-sm">
                  {currency}
                  {item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:w-96 shrink-0">
          <div className="border p-6 sticky top-4">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({getCartTotalCount()} items)</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {currency}
                  {deliveryFee.toFixed(2)}
                </span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-medium text-base">
              <span>Total</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
            <Link
              to="/place-order"
              className="block w-full mt-6 text-center bg-black text-white py-3 text-sm hover:bg-gray-800"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
