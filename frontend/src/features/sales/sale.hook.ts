import { useMutation, useQuery } from "@tanstack/react-query";
import { saleApi } from "./sale.api";
import { SaleQueryParams, SaleRequest } from "./sale.types";
import { useQueryStates } from "nuqs"; 
import { saleParams } from "./sale.params";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (saleRequest: SaleRequest) => saleApi.checkout(saleRequest),
  });
};

export const useSales = (params: SaleQueryParams) => {
  return useQuery({
    queryKey: ["sales", params],
    queryFn: () => saleApi.findAll(params),
  });
};

export const useSalesParams = () => {
  return useQueryStates(saleParams); 
}