package com.coffeepos.backend.auth.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.coffeepos.backend.auth.dto.LoginRequest;
import com.coffeepos.backend.auth.dto.LoginResult;
import com.coffeepos.backend.auth.dto.RegisterRequest;
import com.coffeepos.backend.auth.entity.RefreshToken;
import com.coffeepos.backend.auth.entity.Role;
import com.coffeepos.backend.auth.repository.RoleRepository;
import com.coffeepos.backend.auth.security.CustomUserDetails;
import com.coffeepos.backend.common.enums.RoleName;
import com.coffeepos.backend.user.entity.User;
import com.coffeepos.backend.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            RefreshTokenService refreshTokenService,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager

    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public void register(RegisterRequest request) {
        Boolean existed = userRepository.existsByUsername(request.username());
        if (existed) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already taken");
        }

        Role role = roleRepository.findByRoleName(RoleName.ROLE_CASHIER)
                .orElseGet(() -> roleRepository.save(new Role(RoleName.ROLE_CASHIER)));

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.getRoles().add(role);

        userRepository.save(user);
    }

    public LoginResult login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Long userId = userDetails.getId();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = refreshTokenService.createRefreshToken(userId);

        return new LoginResult(accessToken, refreshToken);
    }

    public LoginResult refresh(String oldRefreshToken) {
        if (oldRefreshToken == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing refresh cookie");
        }

        RefreshToken oldRefreshTokenEntity = refreshTokenService.validate(oldRefreshToken);
        refreshTokenService.revoke(oldRefreshTokenEntity);

        User user = oldRefreshTokenEntity.getUser();
        UserDetails userDetails = new CustomUserDetails(user.getId(), user.getUsername(), user.getPassword(),
                user.getRoles().stream().map(r -> new SimpleGrantedAuthority(r.toString())).toList());

        String newAccessToken = jwtService.generateToken(userDetails);
        String newRawRefreshToken = refreshTokenService.createRefreshToken(user.getId());

        return new LoginResult(newAccessToken, newRawRefreshToken);
    }

    public void logout(String oldRefreshToken) {
        try {
            RefreshToken oldRefreshTokenEntity = refreshTokenService.validate(oldRefreshToken);
            refreshTokenService.revoke(oldRefreshTokenEntity);
        } catch (Exception ignored) {
        }
    }

    public void logoutAll(Authentication auth) {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        refreshTokenService.revokeAllForUser(userDetails.getId());
    }

}
