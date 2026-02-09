export type PaymentMethod = "CASH" | "CARD";

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
}
export interface PaymentResponse {
  id: number;
  saleId: number;
  amount: number;
  method: PaymentMethod;
  paidAt: string;
}
