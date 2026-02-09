package com.coffeepos.backend.payment.service;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.payment.dto.PaymentRequest;
import com.coffeepos.backend.payment.entity.Payment;

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


}
