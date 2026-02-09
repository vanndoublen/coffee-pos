import { UserResponse } from "../auth/auth.types";
import { MenuItemResponse } from "../menu-item/menu-item.types";

export type SaleStatus =
  | "DRAFT"
  | "COMPLETED"
  | "REFUNDED"
  | "VOIDED"
  | "CANCELLED";

export interface SaleRequest {
  receiptNo: string;
  saleStatus: SaleStatus;
  cashierId: number;
  subtotal: number;
  grandTotal: number;
  saleItems: SaleItemRequest[];
  payments: PaymentRequest[];
}

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

export interface SaleItemRequest {
  menuItemId: number;
  menuItemNameSnapshot: string;
  unitPriceSnapshot: number;
  qty: number;
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
