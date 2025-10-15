import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productType } from "@/types/projectTypes";

type States = {
  carts: productType[];
  totalQuantity: number;
};

type Actions = {
  addToCart: (product: productType) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  findTotalQuantity: () => number;
};

export const useCart = create<States & Actions>()(
  persist(
    (set, get) => ({
      carts: [],
      totalQuantity: 0,

      addToCart: (product) =>
        set((state) => ({
          carts: [...state.carts, product],
          totalQuantity: state.totalQuantity + (product.quantity || 1),
        })),

      removeFromCart: (id) =>
        set((state) => {
          const itemToRemove = state.carts.find((p) => p.id === id);
          const quantityToRemove = itemToRemove?.quantity || 1;

          return {
            carts: state.carts.filter((p) => p.id !== id),
            totalQuantity: Math.max(0, state.totalQuantity - quantityToRemove),
          };
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
          totalQuantity: state.totalQuantity + 1,
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    (item.quantity || 1) > 1 ? (item.quantity || 1) - 1 : 1,
                }
              : item
          ),
          totalQuantity: state.totalQuantity > 1 ? state.totalQuantity - 1 : 1,
        })),

      findTotalQuantity: () => {
        const { carts } = get();
        const total = carts.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        set({ totalQuantity: total });
        return total;
      },
    }),
    {
      name: "cart-storage", // Key name for localStorage
    }
  )
);
