package com.karma.renovation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Swagger documentation is public
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // ADMIN and CUSTOMER can read renovation data
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/renovations",
                                "/api/renovations/**"
                        ).hasAnyRole("ADMIN", "CUSTOMER")

                        // ADMIN and CUSTOMER can create bookings
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/renovations",
                                "/api/bookings"
                        ).hasAnyRole("ADMIN", "CUSTOMER")

                        // Only ADMIN can update renovations
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/renovations/**"
                        ).hasRole("ADMIN")

                        // Only ADMIN can delete renovations
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/renovations/**"
                        ).hasRole("ADMIN")

                        // Any other request requires authentication
                        .anyRequest().authenticated()
                )

                .httpBasic(httpBasic -> {
                });

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(
            PasswordEncoder passwordEncoder
    ) {

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        UserDetails customer = User.builder()
                .username("customer")
                .password(passwordEncoder.encode("customer123"))
                .roles("CUSTOMER")
                .build();

        return new InMemoryUserDetailsManager(
                admin,
                customer
        );
    }
}