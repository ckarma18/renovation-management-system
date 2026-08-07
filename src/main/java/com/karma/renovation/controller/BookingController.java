package com.karma.renovation.controller;

import com.karma.renovation.dto.BookingRequestDTO;
import com.karma.renovation.dto.BookingResponseDTO;
import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService
    ) {
        this.bookingService = bookingService;
    }

    // CREATE BOOKING
    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponseDTO>>
    createBooking(
            @Valid @RequestBody BookingRequestDTO requestDTO
    ) {

        BookingResponseDTO createdBooking =
                bookingService.createBooking(requestDTO);

        ApiResponse<BookingResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Booking created successfully.",
                        createdBooking
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // READ ALL BOOKINGS
    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponseDTO>>>
    getAllBookings() {

        List<BookingResponseDTO> bookings =
                bookingService.getAllBookings();

        ApiResponse<List<BookingResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "Bookings fetched successfully.",
                        bookings
                );

        return ResponseEntity.ok(response);
    }

    // READ BOOKING BY ID
    // ADMIN ONLY FOR NOW
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponseDTO>>
    getBookingById(
            @PathVariable Long id
    ) {

        BookingResponseDTO booking =
                bookingService.getBookingById(id);

        ApiResponse<BookingResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Booking fetched successfully.",
                        booking
                );

        return ResponseEntity.ok(response);
    }

    // DELETE BOOKING
    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>>
    deleteBooking(
            @PathVariable Long id
    ) {

        bookingService.deleteBooking(id);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        "Booking deleted successfully.",
                        null
                );

        return ResponseEntity.ok(response);
    }

    // CUSTOMER - VIEW OWN BOOKINGS
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<BookingResponseDTO>>>
    getMyBookings(
            Authentication authentication
    ) {

        List<BookingResponseDTO> bookings =
                bookingService.getMyBookings(
                        authentication.getName()
                );

        ApiResponse<List<BookingResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "My bookings fetched successfully.",
                        bookings
                );

        return ResponseEntity.ok(response);
    }
}