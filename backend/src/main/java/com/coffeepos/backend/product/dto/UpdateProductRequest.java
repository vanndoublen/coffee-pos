package com.coffeepos.backend.product.dto;

import java.math.BigDecimal;

public record UpdateProductRequest(String name, BigDecimal price) {
    
}
