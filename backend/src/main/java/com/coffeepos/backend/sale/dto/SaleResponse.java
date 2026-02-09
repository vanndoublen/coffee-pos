package com.coffeepos.backend.sale.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.coffeepos.backend.payment.dto.PaymentResponse;
import com.coffeepos.backend.user.dto.UserResponse;

public record SaleResponse(
    Long id,
    String receiptNo,
    String status,
    UserResponse cashier,
    BigDecimal subtotal,
    BigDecimal grandTotal,
    Instant createdAt, 
    Instant completedAt,
    List<SaleItemResponse> saleItems,
    List<PaymentResponse> payments

) {
    
}
