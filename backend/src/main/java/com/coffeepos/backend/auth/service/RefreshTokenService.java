package com.coffeepos.backend.auth.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.coffeepos.backend.auth.entity.RefreshToken;
import com.coffeepos.backend.auth.repository.RefreshTokenRepository;
import com.coffeepos.backend.common.utils.HmacUtil;
import com.coffeepos.backend.user.entity.User;

import jakarta.persistence.EntityManager;

@Service
public class RefreshTokenService {
    private final long REFRESH_SECONDS = 7 * 24 * 60 * 60; // 7 days

    private final RefreshTokenRepository refreshTokenRepository;
    private final EntityManager entityManager;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            EntityManager entityManager

    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.entityManager = entityManager;
    }

    public Optional<RefreshToken> getByTokenHash(String token) {
        return refreshTokenRepository.findByTokenHash(token);
    }

    public List<RefreshToken> getAllByUserIdAndRevokedFalse(Long userId) {
        return refreshTokenRepository.findAllByUser_IdAndRevokedFalse(userId);
    }

    public String createRefreshToken(Long userId) {
        String rawToken = UUID.randomUUID().toString();
        String hash = HmacUtil.hmacSha256(rawToken);
        Instant exp = Instant.now().plusSeconds(REFRESH_SECONDS);

        User userRef = entityManager.getReference(User.class, userId);
        refreshTokenRepository.save(new RefreshToken(hash, exp, userRef));

        return rawToken;
    }

    public RefreshToken validate(String refreshToken) {
        String hash = HmacUtil.hmacSha256(refreshToken);

        RefreshToken rt = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));

        if (rt.isRevoked())
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token revoked");
        if (rt.getExpiresAt().isBefore(Instant.now()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expired");

        return rt;
    }

    public void revoke(RefreshToken refreshToken) {
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);
    }

    public void revokeAllForUser(Long userId) {
        var refreshTokens = refreshTokenRepository.findAllByUser_IdAndRevokedFalse(userId);
        for (RefreshToken token : refreshTokens) {
            token.setRevoked(true);
        }
        refreshTokenRepository.saveAll(refreshTokens);
    }

}
