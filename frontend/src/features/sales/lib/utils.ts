import { CartItem } from "@/features/menu-item/menu-item.types";
import {
  PaymentMethod,
  PaymentRequest,
} from "@/features/payments/payment.types";
import { SaleItemRequest } from "../sale.types";

export const generateReceiptNo = () => {
  const now = new Date();

  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}${MM}${dd}-${HH}${mm}${ss}`;
};

export const getSaleItems = (cartItems: CartItem[]): SaleItemRequest[] => {
  return cartItems.map((item) => ({
    menuItemId: item.menuItem.id,
    menuItemNameSnapshot: item.menuItemNameSnapshot,
    unitPriceSnapshot: Number(item.unitPriceSnapshot.toFixed(2)),
    qty: item.qty,
  }));
};

export const getPayments = (
  isMultiplePayments: boolean,
  isCash: boolean,
  isCard: boolean,
  cashCents: number,
  cardCents: number,
  totalCents: number,
  method: PaymentMethod,
): PaymentRequest[] => {
  const payments: PaymentRequest[] = [];

  if (isMultiplePayments) {
    if (isCash && cashCents > 0) {
      payments.push({
        method: "CASH",
        amount: Number((cashCents / 100).toFixed(2)),
      });
    }

    if (isCard && cardCents > 0) {
      payments.push({
        method: "CARD",
        amount: Number((cardCents / 100).toFixed(2)),
      });
    }
  } else {
    if (method === "CASH") {
      payments.push({
        method: "CASH",
        amount: Number((totalCents / 100).toFixed(2)),
      });
    } else if (method === "CARD") {
      payments.push({
        method: "CARD",
        amount: Number((totalCents / 100).toFixed(2)),
      });
    } else {
      return payments;
    }
  }

  return payments;
};
