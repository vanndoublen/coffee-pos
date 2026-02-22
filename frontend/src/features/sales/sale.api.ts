import { apiFetch } from "@/lib/http/client";
import {
  PageResponse,
  SaleQueryParams,
  SaleRequest,
  SaleResponse,
} from "./sale.types";

export const saleApi = {
  async checkout(saleRequest: SaleRequest) {
    return apiFetch<SaleResponse>("/api/sales/checkout", {
      method: "POST",
      body: saleRequest,
    });
  },

  async findAll(params: SaleQueryParams) {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    ).toString();

    return apiFetch<PageResponse<SaleResponse>>(`/api/sales?${query}`);
  },
};
