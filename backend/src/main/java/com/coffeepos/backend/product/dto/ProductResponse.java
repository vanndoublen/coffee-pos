package com.coffeepos.backend.product.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ProductResponse(
    Long id, 
    String name, 
    BigDecimal price,
    Boolean active,
    Instant createdAt,
    Instant updatedAt
) {
    
}
