package com.karma.renovation.config;

import com.karma.renovation.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableMethodSecurity
@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Swagger is public
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // Login and registration are public
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        // CUSTOMER - own renovation requests
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/renovations/my"
                        ).hasRole("CUSTOMER")

                        // ADMIN and CUSTOMER can access renovation GET endpoints.
                        // Controller @PreAuthorize gives more specific restrictions.
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/renovations",
                                "/api/renovations/**"
                        ).hasAnyRole("ADMIN", "CUSTOMER")

                        // ADMIN and CUSTOMER can create renovation requests
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/renovations"
                        ).hasAnyRole("ADMIN", "CUSTOMER")

                        // CUSTOMER - own bookings
                        // IMPORTANT: this must come BEFORE /api/bookings/**
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings/my"
                        ).hasRole("CUSTOMER")

                        // ADMIN - view all bookings / booking by ID
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings",
                                "/api/bookings/**"
                        ).hasRole("ADMIN")

                        // ADMIN - create booking
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/bookings"
                        ).hasRole("ADMIN")

                        // ADMIN - update renovations
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/renovations/**"
                        ).hasRole("ADMIN")

                        // ADMIN - delete renovations and bookings
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/renovations/**",
                                "/api/bookings/**"
                        ).hasRole("ADMIN")

                        // Anything else requires authentication
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder
    ) {

        DaoAuthenticationProvider authenticationProvider =
                new DaoAuthenticationProvider(userDetailsService);

        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }
}