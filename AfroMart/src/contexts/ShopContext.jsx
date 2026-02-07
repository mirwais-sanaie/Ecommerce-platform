import { useState, createContext, useContext, useEffect } from "react";
import { products } from "./../assets/frontend_assets/assets.js";

const CART_STORAGE_KEY = "afromart_cart";
const ORDERS_STORAGE_KEY = "afromart_orders";
const USERS_STORAGE_KEY = "afromart_users";
const AUTH_STORAGE_KEY = "afromart_auth";

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

function loadUsersFromStorage() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadAuthFromStorage() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function ShopProvider({ children }) {
  const currency = "$";
  const deliveryFee = 5.99;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [orders, setOrders] = useState(loadOrdersFromStorage);
  const [users, setUsers] = useState(loadUsersFromStorage);
  const [user, setUser] = useState(loadAuthFromStorage);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveOrdersToStorage(orders);
  }, [orders]);

  const addToCart = (productId, name, price, size, image, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === productId && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, name, price, size, image, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
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
          : item
      )
    );
  };

  const getCartTotalCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const signup = (name, email, password) => {
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) return { success: false, error: "Email already registered" };

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    );
    return { success: true };
  };

  const login = (email, password) => {
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: "Invalid email or password" };

    setUser({ id: found.id, name: found.name, email: found.email });
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ id: found.id, name: found.name, email: found.email })
    );
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

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
    user,
    signup,
    login,
    logout,
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
