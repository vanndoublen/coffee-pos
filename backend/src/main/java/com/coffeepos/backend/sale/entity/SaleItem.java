package com.coffeepos.backend.sale.entity;

import java.math.BigDecimal;

import com.coffeepos.backend.menuItem.entity.MenuItem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "sale_items")
public class SaleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sale_id", nullable = false)
    private Sale sale;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(nullable = false)
    private String menuItemNameSnapshot;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPriceSnapshot;

    @Positive
    @Column(nullable = false)
    private Integer qty;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineTotal;

    public SaleItem() {
    }

    public SaleItem(Sale sale, MenuItem menuItem, String menuItemNameSnapshot, BigDecimal unitPriceSnapshot,
            Integer qty,
            BigDecimal lineTotal) {
        this.sale = sale;
        this.menuItem = menuItem;
        this.menuItemNameSnapshot = menuItemNameSnapshot;
        this.unitPriceSnapshot = unitPriceSnapshot;
        this.qty = qty;
        this.lineTotal = lineTotal;
    }

    public Long getId() {
        return id;
    }

    public Sale getSale() {
        return sale;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public String getMenuItemNameSnapshot() {
        return menuItemNameSnapshot;
    }

    public BigDecimal getUnitPriceSnapshot() {
        return unitPriceSnapshot;
    }

    public Integer getQty() {
        return qty;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    public void setMenuItemNameSnapshot(String menuItemNameSnapshot) {
        this.menuItemNameSnapshot = menuItemNameSnapshot;
    }

    public void setUnitPriceSnapshot(BigDecimal unitPriceSnapshot) {
        this.unitPriceSnapshot = unitPriceSnapshot;
    }

    public void updateQty(int qty) {
        this.qty = qty;
        this.lineTotal = unitPriceSnapshot.multiply(BigDecimal.valueOf(qty));
    }

}
