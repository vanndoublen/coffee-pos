package com.coffeepos.backend.user.dto;

import java.util.List;

public record UserResponse(
        Long id,
        String username,
        List<String> roles
) {}
