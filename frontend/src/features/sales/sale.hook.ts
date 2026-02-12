import { useMutation, useQuery } from "@tanstack/react-query";
import { saleApi } from "./sale.api";
import { SaleRequest } from "./sale.types";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (saleRequest: SaleRequest) => saleApi.checkout(saleRequest),
  });
};

export const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: saleApi.getAll,
  });
};
