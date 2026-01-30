package com.coffeepos.backend.menuItem.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record MenuItemResponse(
                Long id,
                String name,
                BigDecimal price,
                Boolean active,
                Instant createdAt,
                Instant updatedAt) {

}
