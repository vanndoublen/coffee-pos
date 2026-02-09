package com.coffeepos.backend.sale.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.sale.dto.SaleRequest;
import com.coffeepos.backend.sale.dto.SaleResponse;
import com.coffeepos.backend.sale.service.SaleService;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleService saleService; 

    public SaleController(SaleService saleService) {
        this.saleService = saleService; 
    }

    @PostMapping("/checkout") 
    public ResponseEntity<SaleResponse> checkout(@RequestBody SaleRequest request) {
        SaleResponse saleResponse = saleService.checkout(request);
        return ResponseEntity.ok().body(saleResponse); 
    }
}
