package com.coffeepos.backend.menuItem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coffeepos.backend.common.exception.NotFoundException;
import com.coffeepos.backend.menuItem.Repository.MenuItemRepository;
import com.coffeepos.backend.menuItem.dto.CreateMenuItemRequest;
import com.coffeepos.backend.menuItem.dto.MenuItemResponse;
import com.coffeepos.backend.menuItem.dto.UpdateMenuItemRequest;
import com.coffeepos.backend.menuItem.entity.MenuItem;
import com.coffeepos.backend.menuItem.mapper.MenuItemMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final MenuItemMapper menuItemMapper;

    public MenuItemService(
            MenuItemRepository menuItemRepository, MenuItemMapper menuItemMapper) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemMapper = menuItemMapper;
    }

    public List<MenuItemResponse> findAll() {
        List<MenuItem> menuItems = menuItemRepository.findAllByActiveTrue();
        return menuItems.stream().map(p -> menuItemMapper.toResponse(p)).toList();
    }

    public MenuItemResponse findOne(Long id) {
        MenuItem p = menuItemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("MenuItem", id));

        return menuItemMapper.toResponse(p);
    }

    public MenuItemResponse create(CreateMenuItemRequest menuItemRequest) {
        MenuItem p = menuItemMapper.toEntity(menuItemRequest);
        MenuItem saved = menuItemRepository.save(p);

        return menuItemMapper.toResponse(saved);
    }

    public MenuItemResponse update(Long id, UpdateMenuItemRequest menuItemRequest) {
        MenuItem p = menuItemRepository.findById(id).orElseThrow(() -> new NotFoundException("MenuItem", id));

        p.setName(menuItemRequest.name());
        p.setPrice(menuItemRequest.price());

        return menuItemMapper.toResponse(p);
    }
}
