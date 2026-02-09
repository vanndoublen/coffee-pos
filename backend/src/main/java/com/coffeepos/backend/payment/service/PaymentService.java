package com.coffeepos.backend.payment.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.payment.dto.PaymentRequest;
import com.coffeepos.backend.payment.entity.Payment;
import com.coffeepos.backend.sale.entity.Sale;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentService {

    public Payment createEntity(PaymentRequest paymentRequest) {

        Payment payment = new Payment();
        payment.setAmount(paymentRequest.amount());
        payment.setMethod(paymentRequest.method());

        return payment;
    }

    public void validateTotalPayment(Sale sale) {
        BigDecimal paidTotal = sale.getPayments().stream().map(Payment::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);

        if (paidTotal.compareTo(sale.getGrandTotal()) < 0) {
            throw new IllegalStateException("Insufficient payment");
        }
    }


}
