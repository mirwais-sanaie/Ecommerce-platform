import { useState, createContext, useContext, useEffect } from "react";

const CART_STORAGE_KEY = "afromart_cart";
const ORDERS_STORAGE_KEY = "afromart_orders";

const ShopContext = createContext(undefined);

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // ignore
  }
}

function loadOrdersFromStorage() {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveOrdersToStorage(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

export function ShopProvider({ children }) {
  const currency = "$";
  const deliveryFee = 5.99;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [orders, setOrders] = useState(loadOrdersFromStorage);

  //products would normally be fetched from an API, but we'll hardcode some sample data here
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`,
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.status || "Failed to fetch products");
      }

      // Adjust depending on your backend response structure
      setProducts(data.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveOrdersToStorage(orders);
  }, [orders]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (productId, name, price, size, image, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === productId && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { id: productId, name, price, size, image, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size)),
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const getCartTotalCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = (shippingDetails) => {
    if (cartItems.length === 0) return null;

    const subtotal = getCartSubtotal();
    const total = subtotal + deliveryFee;

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      shipping: shippingDetails,
    };

    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    return order;
  };

  const value = {
    products,
    productsLoading,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotalCount,
    getCartSubtotal,
    orders,
    placeOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShopContext() {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }

  return context;
}
