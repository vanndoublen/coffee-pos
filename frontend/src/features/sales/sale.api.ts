import { apiFetch } from "@/lib/http/client";
import { SaleRequest, SaleResponse } from "./sale.types";

export const saleApi = {
  async checkout(saleRequest: SaleRequest) {
    return apiFetch<SaleResponse>("/api/sales/checkout", {
      method: "POST",
      body: saleRequest,
    });
  },

  async getAll() {
    return apiFetch<SaleResponse[]>("/api/sales", {
      method: "GET",
    });
  },
};
