import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, MenuItemResponse } from "../menu-item.types";

export interface CartState {
  items: Map<number, CartItem>;

  addItem: (menuItem: MenuItemResponse) => void;
  removeItem: (menuItem: MenuItemResponse) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: new Map(),

      addItem: (menuItem) =>
        set((state) => {
          const items = new Map(state.items);
          const existing = items.get(menuItem.id);

          if (existing) {
            items.set(menuItem.id, {
              ...existing,
              qty: existing.qty + 1,
              lineTotal:
                (existing.qty + 1) *
                existing.unitPriceSnapshot,
            });
          } else {
            items.set(menuItem.id, {
              menuItem,
              menuItemNameSnapshot: menuItem.name,
              unitPriceSnapshot: menuItem.price,
              qty: 1,
              lineTotal: menuItem.price,
            });
          }

          return { items };
        }),

      removeItem: (menuItem) =>
        set((state) => {
          const items = new Map(state.items);
          const existing = items.get(menuItem.id);

          if (!existing) return { items };

          if (existing.qty <= 1) {
            items.delete(menuItem.id);
          } else {
            items.set(menuItem.id, {
              ...existing,
              qty: existing.qty - 1,
              lineTotal:
                (existing.qty - 1) *
                existing.unitPriceSnapshot,
            });
          }

          return { items };
        }),

      clearCart: () => set({ items: new Map() }),
    }),
    {
      name: "pos_cart",

      // Map → Array for storage
      partialize: (state) => ({
        items: Array.from(state.items.entries()),
      }),

      // Array → Map when loading
      merge: (persisted: any, current) => ({
        ...current,
        items: new Map(persisted?.items || []),
      }),
    }
  )
);
