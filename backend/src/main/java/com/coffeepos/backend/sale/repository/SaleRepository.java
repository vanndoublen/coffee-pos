package com.coffeepos.backend.sale.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.coffeepos.backend.sale.entity.Sale;
import com.coffeepos.backend.sale.enums.SaleStatus;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("""
                SELECT s FROM Sale s
                WHERE
                    (:search IS NULL OR LOWER(s.receiptNo) LIKE LOWER(CONCAT('%', :search, '%')))
                AND
                    (:status IS NULL OR s.status = :status)
            """)
    Page<Sale> search(
            @Param("search") String search,
            @Param("status") SaleStatus status,
            Pageable pageable);
}
