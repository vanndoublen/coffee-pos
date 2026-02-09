package com.coffeepos.backend.sale.dto;

import java.math.BigDecimal;

public record SaleItemResponse(
    Long id,
    Long saleId,
    Long menuItemId,
    String menuItemNameSnapshot,
    BigDecimal unitPriceSnapshot,
    Integer qty,
    BigDecimal lineTotal
) {
    
}
