package com.coffeepos.backend.sale.dto;

import java.math.BigDecimal;
import java.util.List;

import com.coffeepos.backend.payment.dto.PaymentRequest;
import com.coffeepos.backend.sale.enums.SaleStatus;

public record SaleRequest(
    String receiptNo,
    SaleStatus saleStatus,
    Long cashierId,
    BigDecimal subTotal, 
    BigDecimal grandTotal, 
    List<SaleItemRequest> saleItems,
    List<PaymentRequest> payments
) {
    
}
