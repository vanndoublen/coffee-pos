package com.coffeepos.backend.sale.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.sale.dto.SaleRequest;
import com.coffeepos.backend.sale.dto.SaleResponse;
import com.coffeepos.backend.sale.enums.SaleStatus;
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

    @GetMapping
    public ResponseEntity<Page<SaleResponse>> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) SaleStatus status,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<SaleResponse> sales = saleService.findAll(search, status, pageable);
        System.out.println("search = [" + search + "]");
        System.out.println("status = [" + status + "]");
        System.out.println("page = " + pageable.getPageNumber());

        return ResponseEntity.ok().body(sales);
    }
}
