export interface CreateProductRequest {
  name: string;
  price: number;
  stockQty: number;
}

export interface UpdateProductRequest {
  name: string;
  price: number;
  stockQty: number;
}

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    stockQty: number; 
    active: boolean; 
    createdAt: string;
    updatedAt: string;
}