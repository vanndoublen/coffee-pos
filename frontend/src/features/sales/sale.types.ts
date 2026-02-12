import { UserResponse } from "../auth/auth.types";
import { MenuItemResponse } from "../menu-item/menu-item.types";
import { PaymentRequest } from "../payments/payment.types";

export type SaleStatus =
  | "DRAFT"
  | "COMPLETED"
  | "REFUNDED"
  | "VOIDED"
  | "CANCELLED";

export interface SaleRequest {
  receiptNo: string;
  cashierId: number;
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
