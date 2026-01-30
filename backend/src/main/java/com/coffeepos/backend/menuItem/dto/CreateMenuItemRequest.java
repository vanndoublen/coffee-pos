package com.coffeepos.backend.menuItem.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateMenuItemRequest(
                @NotBlank String name,
                @PositiveOrZero BigDecimal price) {
}