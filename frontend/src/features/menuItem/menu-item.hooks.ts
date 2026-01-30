import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuItemApi } from "./menu-item.api";
import type {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "./menu-item.types";

export const useMenuItems = () => {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: menuItemApi.findAll,
  });
};

export const useMenuItem = (id?: number) => {
  return useQuery({
    queryKey: ["menuItems", id],
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
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
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
      queryClient.invalidateQueries({ queryKey: ["menuItems", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
};
