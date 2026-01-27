package com.coffeepos.backend.product.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.product.dto.CreateProductRequest;
import com.coffeepos.backend.product.dto.ProductResponse;
import com.coffeepos.backend.product.dto.UpdateProductRequest;
import com.coffeepos.backend.product.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public ResponseEntity<List<ProductResponse>> findAll() {
        List<ProductResponse> products = productService.findAll(); 

        return ResponseEntity.ok()
        .body(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findOne(@PathVariable Long id) {
        ProductResponse p = productService.findOne(id);
        return ResponseEntity.ok().body(p);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody @Valid CreateProductRequest request) {
        ProductResponse p = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id, @RequestBody @Valid UpdateProductRequest request) {
        ProductResponse p = productService.update(id, request); 
        return ResponseEntity.ok().body(p);
    }

    
}
