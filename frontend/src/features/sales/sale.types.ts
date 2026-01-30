import { UserResponse } from "../auth/auth.types";
import { MenuItemResponse } from "../menuItem/menu-item.types";

export type SaleStatus = "DRAFT" | "COMPLETED" | "CANCELLED";

export interface SaleResponse {
    id: number;
    receiptNo: string;
    status: SaleStatus;
    cashier: UserResponse;
    payment: PaymentResponse;
    subtotal: number;
    grandTotal: number;
    createdAt: string;
    completedAt: string;
    saleItems: SaleItemResponse[];
}

export interface SaleItemResponse {
  id: number;
  sale: SaleResponse;
  menuItem: MenuItemResponse;
  menuItemNameSnapshot: string;
  unitPriceSnapshot: number;
  qty: number;
  lineTotal: number;
}