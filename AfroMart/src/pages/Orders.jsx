import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";

function Orders() {
  const { orders, currency } = useShopContext();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const orderPlacedId = location.state?.orderPlaced;

  if (orders.length === 0) {
    return (
      <div className="py-16 text-center">
        <Title text1="YOUR" text2="ORDERS" />
        <p className="text-gray-500 mt-8 mb-6">
          You haven&apos;t placed any orders yet.
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
      <Title text1="YOUR" text2="ORDERS" />
      <h1 className="text-2xl font-medium mb-8">Order History</h1>

      {orderPlacedId && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-6 text-sm">
          Order <strong>{orderPlacedId}</strong> placed successfully! Thank you
          for your purchase.
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 overflow-hidden"
          >
            <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <span className="font-medium text-sm">{order.id}</span>
                <span className="text-gray-500 text-sm ml-3">
                  {formatDate(order.date)}
                </span>
              </div>
              <span className="font-medium">
                {currency}
                {order.total.toFixed(2)}
              </span>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Shipping address
                  </h3>
                  <p className="text-sm">
                    {order.shipping.name}
                    <br />
                    {order.shipping.address}
                    <br />
                    {order.shipping.city} {order.shipping.zip}
                    <br />
                    {order.shipping.phone}
                    <br />
                    {order.shipping.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Items ({order.items.length})
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-3 text-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover bg-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-gray-500">
                            Size {item.size} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium shrink-0">
                          {currency}
                          {item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm border-t pt-4 text-gray-600">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Delivery</span>
                <span>
                  {currency}
                  {order.deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center font-medium mt-2">
                <span>Total</span>
                <span>
                  {currency}
                  {order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
