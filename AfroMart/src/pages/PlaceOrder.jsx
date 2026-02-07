import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";

function PlaceOrder() {
  const navigate = useNavigate();
  const {
    cartItems,
    currency,
    deliveryFee,
    getCartSubtotal,
    getCartTotalCount,
    placeOrder,
  } = useShopContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  const subtotal = getCartSubtotal();
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP / Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) return;

    const order = placeOrder(formData);
    if (order) {
      navigate("/orders", { state: { orderPlaced: order.id } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Add items to your cart before placing an order.
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
      <h1 className="text-2xl font-medium mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* SHIPPING FORM */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-4">Shipping Details</h2>
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border px-4 py-2 text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-4 py-2 text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border px-4 py-2 text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 234 567 8900"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full border px-4 py-2 text-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123 Main Street, Apt 4"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 text-sm ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div className="w-32 shrink-0">
                <label className="block text-sm text-gray-600 mb-1">
                  ZIP *
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 text-sm ${
                    errors.zip ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="10001"
                />
                {errors.zip && (
                  <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:w-96 shrink-0">
          <div className="border p-6 sticky top-4">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-3 text-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-gray-500">
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium shrink-0">
                    {currency}
                    {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
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
            <div className="flex justify-between font-medium text-base mb-6">
              <span>Total</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800"
            >
              PLACE ORDER
            </button>
            <Link
              to="/cart"
              className="block text-center text-sm text-gray-500 mt-4 hover:text-black"
            >
              ← Back to cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
