package com.coffeepos.backend.payment.dto;

import java.math.BigDecimal;

import com.coffeepos.backend.payment.enums.PaymentMethod;

public record PaymentRequest(
        PaymentMethod method,
        BigDecimal amount
    ) {
}
