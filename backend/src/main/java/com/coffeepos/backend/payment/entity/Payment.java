package com.coffeepos.backend.payment.entity;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import com.coffeepos.backend.payment.enums.PaymentMethod;
import com.coffeepos.backend.sale.entity.Sale;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sale_id", nullable = false, unique = true)
    private Sale sale;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod method;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal paidAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal changeAmount = BigDecimal.ZERO;

    @CreationTimestamp
    private Instant paidAt;

    public Payment() {
    }

    public Long getId() {
        return id;
    }

    public Sale getSale() {
        return sale;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public BigDecimal getChangeAmount() {
        return changeAmount;
    }

    public Instant getPaidAt() {
        return paidAt;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public void setChangeAmount(BigDecimal changeAmount) {
        this.changeAmount = changeAmount;
    }

}
