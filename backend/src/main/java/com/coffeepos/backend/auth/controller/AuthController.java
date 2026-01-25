package com.coffeepos.backend.auth.controller;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coffeepos.backend.auth.dto.AuthResponse;
import com.coffeepos.backend.auth.dto.LoginRequest;
import com.coffeepos.backend.auth.dto.LoginResult;
import com.coffeepos.backend.auth.dto.RegisterRequest;
import com.coffeepos.backend.auth.repository.RoleRepository;
import com.coffeepos.backend.auth.service.AuthService;
import com.coffeepos.backend.auth.service.RefreshTokenService;
import com.coffeepos.backend.auth.service.RoleService;
import com.coffeepos.backend.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final RoleService roleService;
    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public AuthController(
            UserService userService,
            RoleService roleService,
            RefreshTokenService refreshTokenService,
            AuthService authService,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository) {
        this.userService = userService;
        this.roleService = roleService;
        this.refreshTokenService = refreshTokenService;
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        LoginResult loginResult = authService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie(loginResult.refreshToken()).toString())
                .body(new AuthResponse(loginResult.accessToken()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(name = "refresh_token", required = false) String oldRefreshToken) {
        LoginResult result = authService.refresh(oldRefreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie(result.refreshToken()).toString())
                .body(new AuthResponse(result.accessToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue(name = "refresh_token", required = false) String oldRefreshToken) {
        authService.logout(oldRefreshToken);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deleteRefreshCookie().toString())
                .build();
    }

    @PostMapping("/logout-all")
    public ResponseEntity<Void> logoutAll(Authentication auth) {
        authService.logoutAll(auth);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deleteRefreshCookie().toString())
                .build();
    }

    private ResponseCookie refreshCookie(String refreshToken) {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false) // TODO: change to true for https
                .path("/api/auth")
                .maxAge(Duration.ofDays(7))
                .sameSite("lax")
                .build();
    }

    private ResponseCookie deleteRefreshCookie() {
        return ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(0)
                .build();
    }

}
