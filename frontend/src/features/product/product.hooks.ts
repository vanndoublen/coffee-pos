import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "./product.api";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "./product.types";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.findAll,
  });
};

export const useProduct = (id?: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await productApi.findOne(id!);
      return res;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CreateProductRequest) => productApi.create(product),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      product,
    }: {
      id: number;
      product: UpdateProductRequest;
    }) => productApi.update(id, product),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
