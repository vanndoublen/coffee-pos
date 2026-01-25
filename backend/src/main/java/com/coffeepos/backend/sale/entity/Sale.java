package com.coffeepos.backend.sale.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.coffeepos.backend.payment.entity.Payment;
import com.coffeepos.backend.sale.enums.SaleStatus;
import com.coffeepos.backend.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String receiptNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SaleStatus status = SaleStatus.DRAFT;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cashier_id", nullable = false)
    private User cashier;

    @OneToOne(mappedBy="sale_id", cascade=CascadeType.ALL)
    private Payment payment; 

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal grandTotal = BigDecimal.ZERO;

    @CreationTimestamp
    private Instant createdAt; 

    private Instant completedAt; 

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleItem> saleItems = new ArrayList<>();

    public Sale() {}

    

    public Sale(String receiptNo, SaleStatus status, User cashier, BigDecimal subtotal, BigDecimal grandTotal,
            Instant completedAt) {
        this.receiptNo = receiptNo;
        this.status = status;
        this.cashier = cashier;
        this.subtotal = subtotal;
        this.grandTotal = grandTotal;
        this.completedAt = completedAt;
    }



    public Long getId() {
        return id;
    }

    public String getReceiptNo() {
        return receiptNo;
    }

    public SaleStatus getStatus() {
        return status;
    }

    public User getCashier() {
        return cashier;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public BigDecimal getGrandTotal() {
        return grandTotal;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public List<SaleItem> getSaleItems() {
        return saleItems;
    }

    public void setReceiptNo(String receiptNo) {
        this.receiptNo = receiptNo;
    }

    public void setStatus(SaleStatus status) {
        this.status = status;
    }

    public void setCashier(User cashier) {
        this.cashier = cashier;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public void setGrandTotal(BigDecimal grandTotal) {
        this.grandTotal = grandTotal;
    }

    public void complete() {
        this.completedAt = Instant.now();
        this.status = SaleStatus.COMPLETED;
    }

    public void addItem(SaleItem item) {
        saleItems.add(item);
        item.setSale(this);
    }

    public void removeItem(SaleItem item) {
        saleItems.remove(item);
        item.setSale(null);
    }
}
