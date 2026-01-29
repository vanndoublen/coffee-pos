package com.coffeepos.backend.product.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.common.exception.NotFoundException;
import com.coffeepos.backend.product.Repository.ProductRepository;
import com.coffeepos.backend.product.dto.CreateProductRequest;
import com.coffeepos.backend.product.dto.ProductResponse;
import com.coffeepos.backend.product.dto.UpdateProductRequest;
import com.coffeepos.backend.product.entity.Product;
import com.coffeepos.backend.product.mapper.ProductMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(
            ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public List<ProductResponse> findAll() {
        List<Product> products = productRepository.findAllByActiveTrue();
        return products.stream().map(p -> productMapper.toResponse(p)).toList();
    }

    public ProductResponse findOne(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product", id));

        return productMapper.toResponse(p);
    }

    public ProductResponse create(CreateProductRequest productRequest) {
        Product p = productMapper.toEntity(productRequest);
        Product saved = productRepository.save(p);

        return productMapper.toResponse(saved);
    }

    public ProductResponse update(Long id, UpdateProductRequest productRequest) {
        Product p = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product", id));
        
        p.setName(productRequest.name());
        p.setPrice(productRequest.price());

        return productMapper.toResponse(p);
    }
}
