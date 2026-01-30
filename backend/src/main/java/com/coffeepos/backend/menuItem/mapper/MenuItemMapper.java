package com.coffeepos.backend.menuItem.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.menuItem.dto.CreateMenuItemRequest;
import com.coffeepos.backend.menuItem.dto.MenuItemResponse;
import com.coffeepos.backend.menuItem.entity.MenuItem;

@Component
public class MenuItemMapper {
    public MenuItem toEntity(CreateMenuItemRequest p) {
        return new MenuItem(
                p.name(),
                p.price());
    }

    public MenuItemResponse toResponse(MenuItem p) {
        return new MenuItemResponse(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.isActive(),
                p.getCreatedAt(),
                p.getUpdatedAt());
    }
}
