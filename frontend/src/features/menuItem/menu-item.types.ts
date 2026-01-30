export interface CreateMenuItemRequest {
  name: string;
  price: number;
}

export interface UpdateMenuItemRequest {
  name: string;
  price: number;
}

export interface MenuItemResponse {
  id: number;
  name: string;
  price: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
