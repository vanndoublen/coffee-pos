package com.coffeepos.backend.product.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeepos.backend.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByActiveTrue();
}
