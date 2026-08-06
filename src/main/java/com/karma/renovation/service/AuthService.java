package com.karma.renovation.service;

import com.karma.renovation.dto.LoginRequestDTO;
import com.karma.renovation.dto.LoginResponseDTO;
import com.karma.renovation.dto.RegisterRequestDTO;
import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.Role;
import com.karma.renovation.repository.AppUserRepository;
import com.karma.renovation.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // REGISTER CUSTOMER
    @Transactional
    public void registerCustomer(RegisterRequestDTO requestDTO) {

        if (appUserRepository.existsByUsername(requestDTO.getUsername())) {
            throw new IllegalArgumentException(
                    "Username is already in use"
            );
        }

        if (appUserRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException(
                    "Email is already in use"
            );
        }

        AppUser appUser = new AppUser();

        appUser.setFullName(requestDTO.getFullName());
        appUser.setUsername(requestDTO.getUsername());
        appUser.setEmail(requestDTO.getEmail());

        appUser.setPassword(
                passwordEncoder.encode(requestDTO.getPassword())
        );

        appUser.setRole(Role.CUSTOMER);
        appUser.setEnabled(true);

        appUserRepository.save(appUser);
    }

    // LOGIN USER
    @Transactional(readOnly = true)
    public LoginResponseDTO login(LoginRequestDTO requestDTO) {

        // Check username and password
        authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(
                        requestDTO.getUsername(),
                        requestDTO.getPassword()
                )
        );

        // Load authenticated user from MySQL
        AppUser appUser = appUserRepository
                .findByUsername(requestDTO.getUsername())
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with username: "
                                        + requestDTO.getUsername()
                        )
                );

        // Generate JWT token
        String token =
                jwtService.generateToken(appUser.getUsername());

        // Return token and user information
        return new LoginResponseDTO(
                token,
                "Bearer",
                appUser.getUsername(),
                appUser.getRole().name()
        );
    }
}