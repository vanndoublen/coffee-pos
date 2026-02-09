package com.coffeepos.backend.menuItem.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coffeepos.backend.menuItem.entity.MenuItem;
import com.coffeepos.backend.menuItem.repository.MenuItemRepository;

@Component
public class MenuItemSeeder implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;

    public MenuItemSeeder(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {

        if (menuItemRepository.count() > 0) {
            return;
        }

        List<MenuItem> items = List.of(
            new MenuItem("Espresso", bd(2.00)),
            new MenuItem("Americano", bd(2.50)),
            new MenuItem("Latte", bd(3.50)),
            new MenuItem("Cappuccino", bd(3.50)),
            new MenuItem("Flat White", bd(3.80)),
            new MenuItem("Mocha", bd(4.00)),
            new MenuItem("Macchiato", bd(3.20)),
            new MenuItem("Iced Latte", bd(3.80)),
            new MenuItem("Cold Brew", bd(3.80)),
            new MenuItem("Iced Americano", bd(3.00)),

            new MenuItem("Croissant", bd(2.80)),
            new MenuItem("Chocolate Muffin", bd(3.00)),
            new MenuItem("Blueberry Muffin", bd(3.00)),
            new MenuItem("Cheesecake Slice", bd(4.50)),
            new MenuItem("Brownie", bd(3.20)),

            new MenuItem("Bottled Water", bd(1.50)),
            new MenuItem("Orange Juice", bd(3.50)),
            new MenuItem("Iced Tea", bd(2.80)),
            new MenuItem("Lemonade", bd(3.00)),
            new MenuItem("Matcha Latte", bd(4.20))
        );

        menuItemRepository.saveAll(items);

        System.out.println("✅ Default menu items seeded.");
    }

    private BigDecimal bd(double value) {
        return BigDecimal.valueOf(value);
    }
}
