package com.coffeepos.backend.menuItem.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.menuItem.dto.CreateMenuItemRequest;
import com.coffeepos.backend.menuItem.dto.MenuItemResponse;
import com.coffeepos.backend.menuItem.dto.UpdateMenuItemRequest;
import com.coffeepos.backend.menuItem.service.MenuItemService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/menuItems")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponse>> findAll() {
        List<MenuItemResponse> menuItems = menuItemService.getAll();

        return ResponseEntity.ok()
                .body(menuItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemResponse> findOne(@PathVariable Long id) {
        MenuItemResponse p = menuItemService.getOne(id);
        return ResponseEntity.ok().body(p);
    }

    @PostMapping
    public ResponseEntity<MenuItemResponse> create(@RequestBody @Valid CreateMenuItemRequest request) {
        MenuItemResponse p = menuItemService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItemResponse> update(@PathVariable Long id,
            @RequestBody @Valid UpdateMenuItemRequest request) {
        MenuItemResponse p = menuItemService.update(id, request);
        return ResponseEntity.ok().body(p);
    }

}
