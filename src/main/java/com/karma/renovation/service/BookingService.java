package com.karma.renovation.service;

import com.karma.renovation.dto.BookingRequestDTO;
import com.karma.renovation.dto.BookingResponseDTO;
import com.karma.renovation.entity.Booking;
import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.exception.ResourceNotFoundException;
import com.karma.renovation.repository.BookingRepository;
import com.karma.renovation.repository.RenovationRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RenovationRequestRepository renovationRequestRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RenovationRequestRepository renovationRequestRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.renovationRequestRepository = renovationRequestRepository;
    }

    // CREATE BOOKING
    public BookingResponseDTO createBooking(
            BookingRequestDTO requestDTO
    ) {

        RenovationRequest renovationRequest =
                renovationRequestRepository
                        .findById(requestDTO.getRenovationRequestId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Renovation request not found with ID: "
                                                + requestDTO.getRenovationRequestId()
                                )
                        );

        if (bookingRepository
                .findByRenovationRequest(renovationRequest)
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Booking already exists for this renovation request"
            );
        }

        Booking booking = new Booking();

        booking.setBookingDate(
                requestDTO.getBookingDate()
        );

        booking.setBookingTime(
                requestDTO.getBookingTime()
        );

        booking.setStatus("SCHEDULED");

        booking.setRenovationRequest(
                renovationRequest
        );

        Booking savedBooking =
                bookingRepository.save(booking);

        return convertToResponseDTO(savedBooking);
    }

    // READ ALL
    public List<BookingResponseDTO> getAllBookings() {

        return bookingRepository
                .findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // READ BY ID
    public BookingResponseDTO getBookingById(Long id) {

        Booking booking =
                findBookingById(id);

        return convertToResponseDTO(booking);
    }

    // DELETE
    public void deleteBooking(Long id) {

        Booking booking =
                findBookingById(id);

        bookingRepository.delete(booking);
    }

    // HELPER
    private Booking findBookingById(Long id) {

        return bookingRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with ID: " + id
                        )
                );
    }

    public List<BookingResponseDTO> getMyBookings(
            String username
    ) {

        return bookingRepository
                .findByRenovationRequest_User_Username(username)
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // ENTITY -> RESPONSE DTO
    private BookingResponseDTO convertToResponseDTO(
            Booking booking
    ) {

        BookingResponseDTO responseDTO =
                new BookingResponseDTO();

        responseDTO.setId(
                booking.getId()
        );

        responseDTO.setBookingDate(
                booking.getBookingDate()
        );

        responseDTO.setBookingTime(
                booking.getBookingTime()
        );

        responseDTO.setStatus(
                booking.getStatus()
        );

        responseDTO.setRenovationRequestId(
                booking
                        .getRenovationRequest()
                        .getId()
        );

        responseDTO.setCustomerName(
                booking
                        .getRenovationRequest()
                        .getCustomerName()
        );

        return responseDTO;
    }
}