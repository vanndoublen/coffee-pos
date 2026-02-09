package com.coffeepos.backend.payment.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentResponse(
    Long id,
    Long saleId,
    BigDecimal amount,
    String method,
    Instant paidAt
) {
    
}
