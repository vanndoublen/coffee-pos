package com.coffeepos.backend.payment.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.payment.dto.PaymentResponse;
import com.coffeepos.backend.payment.entity.Payment;

@Component
public class PaymentMapper {
    public PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
            payment.getId(),
            payment.getSale().getId(),
            payment.getAmount(),
            payment.getMethod().toString(),
            payment.getPaidAt()
        );
    }
}
