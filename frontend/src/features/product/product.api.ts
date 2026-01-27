import { apiFetch } from "@/lib/http/client";
import type {CreateProductRequest, UpdateProductRequest, ProductResponse} from "./product.types";

export const productApi = {
    async findAll() {
        return apiFetch<ProductResponse[]>("/api/products", {
            method: "GET"
        });
    },

    async findOne(id: number) {
        return apiFetch<ProductResponse>(`/api/products/${id}`, {
            method: "GET"
        }); 
    },

    async create(product: CreateProductRequest) {
        return apiFetch<ProductResponse>(`/api/products`, {
            method: "POST",
            body: product
        })
    },

    async update(id: number, product: UpdateProductRequest) {
        return apiFetch<ProductResponse>(`/api/products/${id}`, {
            method: "PUT",
            body: product
        }) 
    }


}