package com.coffeepos.backend.user.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.auth.security.CustomUserDetails;
import com.coffeepos.backend.user.dto.UserResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {


    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal CustomUserDetails user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getAuthorities().stream().map(r -> r.getAuthority()).toList());
    }
}
