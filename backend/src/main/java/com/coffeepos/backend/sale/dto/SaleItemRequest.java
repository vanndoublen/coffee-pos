package com.coffeepos.backend.sale.dto;

import java.math.BigDecimal;

public record SaleItemRequest(
    Long menuItemId,
    String menuItemNameSnapshot,
    BigDecimal unitPriceSnapshot, 
    Integer qty
) {
    
}
