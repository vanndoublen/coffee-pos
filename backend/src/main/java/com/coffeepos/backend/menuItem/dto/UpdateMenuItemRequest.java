package com.coffeepos.backend.menuItem.dto;

import java.math.BigDecimal;

public record UpdateMenuItemRequest(String name, BigDecimal price) {

}
