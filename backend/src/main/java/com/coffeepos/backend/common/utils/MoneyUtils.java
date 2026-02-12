package com.coffeepos.backend.common.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class MoneyUtils{
    private MoneyUtils(){};

    public static BigDecimal money(BigDecimal value) {
        if (value == null) return null; 

        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
