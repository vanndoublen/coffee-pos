package com.coffeepos.backend.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeepos.backend.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
    
}
