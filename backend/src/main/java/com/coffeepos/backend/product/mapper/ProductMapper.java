package com.coffeepos.backend.product.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.product.dto.CreateProductRequest;
import com.coffeepos.backend.product.dto.ProductResponse;
import com.coffeepos.backend.product.entity.Product;

@Component
public class ProductMapper {
    public Product toEntity(CreateProductRequest p) {
        return new Product(
                p.name(),
                p.price(),
                p.stockQty());
    }

    public ProductResponse toResponse(Product p) {
        return new ProductResponse(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getStockQty(),
                p.isActive(),
                p.getCreatedAt(),
                p.getUpdatedAt());
    }
}
