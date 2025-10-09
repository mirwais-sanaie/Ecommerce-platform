import { productType } from "@/types/projectTypes";
import { create } from "zustand";

type States = {
  carts: productType[];
};

type Actions = {
  addToCart: (product: productType) => void;
  removeFromCart: (id: number) => void;
};

export const useCart = create<States & Actions>((set) => ({
  carts: [],
  addToCart: (product: productType) =>
    set((state: States) => ({ carts: [...state.carts, product] })),
  removeFromCart: (productId: number) =>
    set((state: States) => ({
      carts: state.carts.filter((p: productType) => p.id !== productId),
    })),
}));
