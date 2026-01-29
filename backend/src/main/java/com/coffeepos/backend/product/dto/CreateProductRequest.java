package com.coffeepos.backend.product.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateProductRequest(
    @NotBlank String name, 
    @PositiveOrZero BigDecimal price
) {}