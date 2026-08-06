package com.karma.renovation.controller;

import com.karma.renovation.dto.LoginRequestDTO;
import com.karma.renovation.dto.LoginResponseDTO;
import com.karma.renovation.dto.RegisterRequestDTO;
import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // REGISTER CUSTOMER
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerCustomer(
            @Valid @RequestBody RegisterRequestDTO requestDTO
    ) {

        authService.registerCustomer(requestDTO);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        "Customer registered successfully.",
                        null
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
            @Valid @RequestBody LoginRequestDTO requestDTO
    ) {

        LoginResponseDTO loginResponse =
                authService.login(requestDTO);

        ApiResponse<LoginResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Login successful.",
                        loginResponse
                );

        return ResponseEntity.ok(response);
    }
}