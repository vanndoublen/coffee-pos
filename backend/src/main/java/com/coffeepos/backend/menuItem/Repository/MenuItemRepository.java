package com.coffeepos.backend.menuItem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coffeepos.backend.menuItem.entity.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findAllByActiveTrue();
}
