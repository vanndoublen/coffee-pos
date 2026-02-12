package com.coffeepos.backend.sale.dto;

import java.util.List;

import com.coffeepos.backend.payment.dto.PaymentRequest;

public record SaleRequest(
    String receiptNo,
    Long cashierId,
    List<SaleItemRequest> saleItems,
    List<PaymentRequest> payments
) {
    
}
