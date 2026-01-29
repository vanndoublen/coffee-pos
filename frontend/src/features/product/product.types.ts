export interface CreateProductRequest {
  name: string;
  price: number;
}

export interface UpdateProductRequest {
  name: string;
  price: number;
}

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    active: boolean; 
    createdAt: string;
    updatedAt: string;
}