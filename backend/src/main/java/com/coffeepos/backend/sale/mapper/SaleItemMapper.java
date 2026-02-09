package com.coffeepos.backend.sale.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.sale.dto.SaleItemResponse;
import com.coffeepos.backend.sale.entity.SaleItem;

@Component
public class SaleItemMapper {
    public SaleItemResponse toResponse(SaleItem saleItem) {
        return new SaleItemResponse(
            saleItem.getId(),
            saleItem.getSale().getId(),
            saleItem.getMenuItem().getId(),
            saleItem.getMenuItemNameSnapshot(),
            saleItem.getUnitPriceSnapshot(),
            saleItem.getQty(),
            saleItem.getLineTotal()
        ); 
    }
}
