package com.karma.renovation.controller;

import com.karma.renovation.dto.PaymentRequestDTO;
import com.karma.renovation.dto.PaymentResponseDTO;
import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService
    ) {
        this.paymentService = paymentService;
    }

    // CUSTOMER - CREATE PAYMENT
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponseDTO>>
    createPayment(
            @Valid @RequestBody PaymentRequestDTO requestDTO
    ) {

        PaymentResponseDTO createdPayment =
                paymentService.createPayment(requestDTO);

        ApiResponse<PaymentResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Payment completed successfully.",
                        createdPayment
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ADMIN - VIEW ALL PAYMENTS
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PaymentResponseDTO>>>
    getAllPayments() {

        List<PaymentResponseDTO> payments =
                paymentService.getAllPayments();

        ApiResponse<List<PaymentResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "Payments fetched successfully.",
                        payments
                );

        return ResponseEntity.ok(response);
    }

    // CUSTOMER - VIEW OWN PAYMENTS
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<PaymentResponseDTO>>>
    getMyPayments(
            Authentication authentication
    ) {

        List<PaymentResponseDTO> payments =
                paymentService.getMyPayments(
                        authentication.getName()
                );

        ApiResponse<List<PaymentResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "My payments fetched successfully.",
                        payments
                );

        return ResponseEntity.ok(response);
    }

    // ADMIN - VIEW PAYMENT BY ID
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>>
    getPaymentById(
            @PathVariable Long id
    ) {

        PaymentResponseDTO payment =
                paymentService.getPaymentById(id);

        ApiResponse<PaymentResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Payment fetched successfully.",
                        payment
                );

        return ResponseEntity.ok(response);
    }

    // ADMIN - DELETE PAYMENT
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>>
    deletePayment(
            @PathVariable Long id
    ) {

        paymentService.deletePayment(id);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        "Payment deleted successfully.",
                        null
                );

        return ResponseEntity.ok(response);
    }
}