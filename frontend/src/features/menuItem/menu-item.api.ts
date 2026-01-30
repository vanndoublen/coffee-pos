import { apiFetch } from "@/lib/http/client";
import type {
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
  MenuItemResponse,
} from "./menu-item.types";

export const menuItemApi = {
  async findAll() {
    return apiFetch<MenuItemResponse[]>("/api/menuItems", {
      method: "GET",
    });
  },

  async findOne(id: number) {
    return apiFetch<MenuItemResponse>(`/api/menuItems/${id}`, {
      method: "GET",
    });
  },

  async create(menuItem: CreateMenuItemRequest) {
    return apiFetch<MenuItemResponse>(`/api/menuItems`, {
      method: "POST",
      body: menuItem,
    });
  },

  async update(id: number, menuItem: UpdateMenuItemRequest) {
    return apiFetch<MenuItemResponse>(`/api/menuItems/${id}`, {
      method: "PUT",
      body: menuItem,
    });
  },
};
