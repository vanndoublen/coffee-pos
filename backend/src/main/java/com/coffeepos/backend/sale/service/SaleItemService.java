package com.coffeepos.backend.sale.service;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.menuItem.entity.MenuItem;
import com.coffeepos.backend.sale.dto.SaleItemRequest;
import com.coffeepos.backend.sale.entity.SaleItem;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class SaleItemService {

    private final EntityManager entityManager;

    public SaleItemService(EntityManager entityManager) {
        this.entityManager = entityManager; 
    }

    public SaleItem createEntity(SaleItemRequest saleItemRequest) {
        SaleItem saleItem = new SaleItem();

        MenuItem menuItem = entityManager.getReference(MenuItem.class, saleItemRequest.menuItemId());
        saleItem.setMenuItem(menuItem);

        saleItem.setMenuItemNameSnapshot(saleItemRequest.menuItemNameSnapshot());
        saleItem.setUnitPriceSnapshot(saleItemRequest.unitPriceSnapshot());
        saleItem.updateQty(saleItemRequest.qty());

        return saleItem;
    }
}
