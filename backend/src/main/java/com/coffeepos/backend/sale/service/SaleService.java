package com.coffeepos.backend.sale.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.payment.entity.Payment;
import com.coffeepos.backend.payment.service.PaymentService;
import com.coffeepos.backend.sale.dto.SaleRequest;
import com.coffeepos.backend.sale.dto.SaleResponse;
import com.coffeepos.backend.sale.entity.Sale;
import com.coffeepos.backend.sale.entity.SaleItem;
import com.coffeepos.backend.sale.mapper.SaleMapper;
import com.coffeepos.backend.sale.repository.SaleRepository;
import com.coffeepos.backend.user.entity.User;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class SaleService {
    private final SaleRepository saleRepository;
    private final EntityManager entityManager;
    private final SaleItemService saleItemService;
    private final PaymentService paymentService; 
    private final SaleMapper saleMapper; 

    public SaleService(
            SaleRepository saleRepository,
            EntityManager entityManager,
            SaleItemService saleItemService, 
            PaymentService paymentService,
            SaleMapper saleMapper

        ) {
        this.saleRepository = saleRepository;
        this.entityManager = entityManager;
        this.saleItemService = saleItemService;
        this.paymentService = paymentService; 
        this.saleMapper = saleMapper; 
    }

    public SaleResponse checkout(SaleRequest saleRequest) {
        Sale sale = buildSale(saleRequest); 
        
        paymentService.validateTotalPayment(sale);

        sale.complete();

        saleRepository.save(sale);

        return saleMapper.toResponse(sale);
    }

    private Sale buildSale(SaleRequest saleRequest) {
        Sale sale = new Sale();

        // use date for receiptNo (TODO: find a nicer solution)
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");
        sale.setReceiptNo(now.format(formatter));

        sale.setSubtotal(saleRequest.subTotal());
        sale.setGrandTotal(saleRequest.grandTotal());

        User user = entityManager.getReference(User.class, saleRequest.cashierId());
        sale.setCashier(user);

        List<SaleItem> saleItems = new ArrayList<>();
        for (var saleItem : saleRequest.saleItems()) {
            saleItems.add(saleItemService.createEntity(saleItem));
        }
        saleItems.forEach(sale::addItem);

        List<Payment> payments = new ArrayList<>();
        for (var paymentRequest : saleRequest.payments()) {
            payments.add(paymentService.createEntity(paymentRequest));
        }
        payments.forEach(sale::addPayment);

        return sale;
    }
    

    
}
