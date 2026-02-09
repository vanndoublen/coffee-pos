package com.coffeepos.backend.sale.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.payment.mapper.PaymentMapper;
import com.coffeepos.backend.sale.dto.SaleResponse;
import com.coffeepos.backend.sale.entity.Sale;
import com.coffeepos.backend.user.mapper.UserMapper;

@Component
public class SaleMapper {
    private final UserMapper userMapper; 
    private final PaymentMapper paymentMapper; 
    private final SaleItemMapper saleItemMapper; 

    public SaleMapper(UserMapper userMapper, PaymentMapper paymentMapper, SaleItemMapper saleItemMapper) {
        this.userMapper = userMapper; 
        this.paymentMapper = paymentMapper; 
        this.saleItemMapper = saleItemMapper;
    }

    public SaleResponse toResponse(Sale sale) {
        return new SaleResponse(
            sale.getId(), 
            sale.getReceiptNo(),
            sale.getStatus().toString(),
            userMapper.toResponse(sale.getCashier()),
            sale.getSubtotal(),
            sale.getGrandTotal(),
            sale.getCreatedAt(),
            sale.getCompletedAt(),
            sale.getSaleItems().stream().map(saleItemMapper::toResponse).toList(),
            sale.getPayments().stream().map(paymentMapper::toResponse).toList()
        );
    }
}
