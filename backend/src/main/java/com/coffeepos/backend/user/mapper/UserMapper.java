package com.coffeepos.backend.user.mapper;

import org.springframework.stereotype.Component;

import com.coffeepos.backend.user.dto.UserResponse;
import com.coffeepos.backend.user.entity.User;

@Component
public class UserMapper {
    public UserResponse toResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getUsername(), 
            user.getRoles().stream().map(role -> role.toString()).toList()
        ); 
    }
}
