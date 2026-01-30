import { useEffect, useMemo, useState } from "react";
import { CartItem, MenuItemResponse } from "../menu-item.types";

const STORAGE_KEY = "pos_cart_v1";

const loadcart = (): CartItem[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : []; 
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadcart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems])

  const addItem = (menuItem: MenuItemResponse) => {
    setCartItems(prev => {
      const existed = prev.some(
        item => item.menuItem.id === menuItem.id
      );

      if (existed) {
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? {
                ...item,
                qty: item.qty + 1,
                lineTotal:
                  (item.qty + 1) * item.unitPriceSnapshot
              }
            : item
        );
      }

      return [
        ...prev,
        {
          menuItem,
          menuItemNameSnapshot: menuItem.name,
          unitPriceSnapshot: menuItem.price,
          qty: 1,
          lineTotal: menuItem.price
        }
      ];
    });
  };

  const removeItem = (menuItem: MenuItemResponse) => {
    setCartItems(prev => {
      const existedItem = prev.find(
        item => item.menuItem.id === menuItem.id
      );

      if (!existedItem) return prev;

      if (existedItem.qty === 1) {
        return prev.filter(
          item => item.menuItem.id !== menuItem.id
        );
      }

      return prev.map(item =>
        item.menuItem.id === menuItem.id
          ? {
              ...item,
              qty: item.qty - 1,
              lineTotal:
                (item.qty - 1) * item.unitPriceSnapshot
            }
          : item
      );
    });
  };

  const clearCart = () => setCartItems([]);

  // ---- totals ----
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + item.unitPriceSnapshot * item.qty,
        0
      ),
    [cartItems]
  );

  const tax = useMemo(() => subtotal * 0.1, [subtotal]);

  const total = useMemo(
    () => subtotal + tax,
    [subtotal, tax]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((a, i) => a + i.qty, 0),
    [cartItems]
  );

  return {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    subtotal,
    tax,
    total,
    itemCount
  };
};
