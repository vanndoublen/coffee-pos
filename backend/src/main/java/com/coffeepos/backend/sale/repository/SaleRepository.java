package com.coffeepos.backend.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeepos.backend.sale.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{
    
}
