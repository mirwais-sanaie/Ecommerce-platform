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
        set((state) => {
          const existing = state.carts.find((p) => p.id === product.id);

          if (existing) {
            // If product exists, just increase its quantity
            return {
              carts: state.carts.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
              totalQuantity: state.totalQuantity + 1,
            };
          }

          // Otherwise, add new product
          return {
            carts: [...state.carts, { ...product, quantity: 1 }],
            totalQuantity: state.totalQuantity + 1,
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const itemToRemove = state.carts.find((p) => p.id === id);
          const quantityToRemove = itemToRemove?.quantity || 0;

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
        set((state) => {
          let decreased = false;
          const updatedCarts = state.carts.map((item) => {
            if (item.id === id) {
              // If quantity > 1, allow decrease
              if ((item.quantity || 1) > 1) {
                decreased = true;
                return { ...item, quantity: (item.quantity || 1) - 1 };
              }
            }
            return item;
          });

          // Decrease totalQuantity only if item quantity actually decreased
          return {
            carts: updatedCarts,
            totalQuantity: decreased
              ? state.totalQuantity - 1
              : state.totalQuantity,
          };
        }),

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
      name: "cart-storage", // Key name in localStorage
    }
  )
);
