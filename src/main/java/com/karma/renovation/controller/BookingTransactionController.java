package com.karma.renovation.controller;

import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.dto.BookingRequestDTO;
import com.karma.renovation.service.BookingTransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingTransactionController {

    private final BookingTransactionService bookingTransactionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> bookRenovation(
            @Valid @RequestBody BookingRequestDTO bookingRequestDTO
    ) {

        bookingTransactionService.bookRenovation(
                bookingRequestDTO.getRenovationRequest(),
                bookingRequestDTO.getPayment(),
                bookingRequestDTO.getNotification()
        );

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Renovation booking completed successfully",
                null
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}