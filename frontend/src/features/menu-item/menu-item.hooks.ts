import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuItemApi } from "./menu-item.api";
import type {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "./menu-item.types";

export const useMenuItems = () => {
  return useQuery({
    queryKey: ["menu-items"],
    queryFn: menuItemApi.findAll,
  });
};

export const useMenuItem = (id?: number) => {
  return useQuery({
    queryKey: ["menu-items", id],
    queryFn: async () => {
      const res = await menuItemApi.findOne(id!);
      return res;
    },
    enabled: !!id,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menuItem: CreateMenuItemRequest) =>
      menuItemApi.create(menuItem),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      menuItem,
    }: {
      id: number;
      menuItem: UpdateMenuItemRequest;
    }) => menuItemApi.update(id, menuItem),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["menu-items", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};
