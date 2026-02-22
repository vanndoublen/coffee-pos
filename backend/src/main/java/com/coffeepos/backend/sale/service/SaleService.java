package com.coffeepos.backend.sale.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.coffeepos.backend.common.utils.MoneyUtils;
import com.coffeepos.backend.payment.entity.Payment;
import com.coffeepos.backend.payment.service.PaymentService;
import com.coffeepos.backend.sale.dto.SaleRequest;
import com.coffeepos.backend.sale.dto.SaleResponse;
import com.coffeepos.backend.sale.entity.Sale;
import com.coffeepos.backend.sale.entity.SaleItem;
import com.coffeepos.backend.sale.enums.SaleStatus;
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

    private final BigDecimal TAX = new BigDecimal("0.10");

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

    public Page<SaleResponse> findAll(
        String search, 
        SaleStatus status, 
        Pageable pageable
    ) {
        Page<Sale> sales = saleRepository.search(search, status, pageable); 

        return sales.map(saleMapper::toResponse); 
    }

    public List<SaleResponse> getAll() {
        List<Sale> sales = saleRepository.findAll(); 
        return sales.stream().map(s -> saleMapper.toResponse(s)).toList(); 
    }

    private Sale buildSale(SaleRequest saleRequest) {
        Sale sale = new Sale();

        sale.setReceiptNo(saleRequest.receiptNo());

        User user = entityManager.getReference(User.class, saleRequest.cashierId());
        sale.setCashier(user);

        List<SaleItem> saleItems = new ArrayList<>();
        for (var saleItem : saleRequest.saleItems()) {
            saleItems.add(saleItemService.createEntity(saleItem));
        }
        saleItems.forEach(sale::addItem);


        BigDecimal subtotal = MoneyUtils.money(saleItems.stream().map(SaleItem::getLineTotal).reduce(BigDecimal.ZERO, BigDecimal::add)); 
        BigDecimal grandTotal = MoneyUtils.money(subtotal.multiply(TAX).add(subtotal));
        sale.setSubtotal(subtotal);
        sale.setGrandTotal(grandTotal);

        List<Payment> payments = new ArrayList<>();
        for (var paymentRequest : saleRequest.payments()) {
            payments.add(paymentService.createEntity(paymentRequest));
        }
        payments.forEach(sale::addPayment);

        return sale;
    }
    

    
}
