import { createContext, useContext } from "react";
import { products } from "./../assets/frontend_assets/assets.js";

const ShopContext = createContext(undefined);

export function ShopProvider({ children }) {
  const currency = "USD";
  const deliveryFee = 5.99;

  const value = { products, currency, deliveryFee };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShopContext() {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }

  return context;
}
