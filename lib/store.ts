import { productType } from "@/types/projectTypes";
import { create } from "zustand";

type States = {
  carts: productType[];
};

type Actions = {
  addToCart: (product: productType) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

export const useCart = create<States & Actions>((set) => ({
  carts: [],
  addToCart: (product: productType) =>
    set((state: States) => {
      console.log(state);
      return { carts: [...state.carts, product] };
    }),
  removeFromCart: (productId: number) =>
    set((state: States) => {
      console.log(state);
      return {
        carts: state.carts.filter((p: productType) => p.id !== productId),
      };
    }),

  increaseQuantity: (id: number) =>
    set((state: States) => ({
      carts: state.carts.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ),
    })),
  decreaseQuantity: (id: number) =>
    set((state: States) => ({
      carts: state.carts.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) - 1 > 0 ? (item.quantity || 1) - 1 : 1,
            }
          : item
      ),
    })),
}));
