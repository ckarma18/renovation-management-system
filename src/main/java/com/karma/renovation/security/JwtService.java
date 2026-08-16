package com.karma.renovation.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private final String secretKey;
    private final long jwtExpiration;

    public JwtService(
            @Value("${app.jwt.secret}") String secretKey,
            @Value("${app.jwt.expiration}") long jwtExpiration
    ) {
        this.secretKey = secretKey;
        this.jwtExpiration = jwtExpiration;
    }

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secretKey.getBytes(StandardCharsets.UTF_8)
        );
    }

    // GENERATE TOKEN
    public String generateToken(String username) {

        Date currentDate = new Date();

        Date expirationDate =
                new Date(
                        currentDate.getTime()
                                + jwtExpiration
                );

        return Jwts.builder()
                .subject(username)
                .issuedAt(currentDate)
                .expiration(expirationDate)
                .signWith(getSigningKey())
                .compact();
    }

    // EXTRACT USERNAME
    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    // EXTRACT EXPIRATION DATE
    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }

    // EXTRACT ONE CLAIM
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        Claims claims =
                extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // EXTRACT ALL CLAIMS
    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // CHECK EXPIRATION
    private boolean isTokenExpired(
            String token
    ) {

        return extractExpiration(token)
                .before(new Date());
    }

    // VALIDATE TOKEN
    public boolean isTokenValid(
            String token,
            String username
    ) {

        String tokenUsername =
                extractUsername(token);

        return tokenUsername.equals(username)
                && !isTokenExpired(token);
    }
}