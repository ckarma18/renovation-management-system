package com.karma.renovation.service;

import com.karma.renovation.dto.PaymentRequestDTO;
import com.karma.renovation.dto.PaymentResponseDTO;
import com.karma.renovation.entity.Booking;
import com.karma.renovation.entity.Payment;
import com.karma.renovation.exception.ResourceNotFoundException;
import com.karma.renovation.repository.BookingRepository;
import com.karma.renovation.repository.PaymentRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    public PaymentService(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            NotificationService notificationService
    ) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.notificationService = notificationService;
    }

    // CREATE PAYMENT
    public PaymentResponseDTO createPayment(
            PaymentRequestDTO requestDTO
    ) {

        Booking booking = bookingRepository
                .findById(requestDTO.getBookingId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with ID: "
                                        + requestDTO.getBookingId()
                        )
                );

        if (paymentRepository
                .findByBooking(booking)
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Payment already exists for this booking"
            );
        }

        Payment payment = new Payment();

        payment.setAmount(
                requestDTO.getAmount()
        );

        payment.setPaymentMethod(
                requestDTO.getPaymentMethod()
        );

        payment.setStatus("PAID");

        payment.setPaymentDate(
                LocalDateTime.now()
        );

        payment.setBooking(
                booking
        );

        Payment savedPayment =
                paymentRepository.save(payment);

        String username = booking
                .getRenovationRequest()
                .getUser()
                .getUsername();

        notificationService.createNotification(
                username,
                "Payment Successful",
                "Your payment of Rs. "
                        + savedPayment.getAmount()
                        + " was completed successfully."
        );

        return convertToResponseDTO(savedPayment);
    }

    // READ ALL PAYMENTS
    public List<PaymentResponseDTO> getAllPayments() {

        return paymentRepository
                .findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // READ PAYMENT BY ID
    public PaymentResponseDTO getPaymentById(Long id) {

        Payment payment =
                findPaymentById(id);

        return convertToResponseDTO(payment);
    }

    // CUSTOMER - READ OWN PAYMENTS
    public List<PaymentResponseDTO> getMyPayments(
            String username
    ) {

        return paymentRepository
                .findByBooking_RenovationRequest_User_Username(
                        username
                )
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // DELETE PAYMENT
    public void deletePayment(Long id) {

        Payment payment =
                findPaymentById(id);

        paymentRepository.delete(payment);
    }

    // HELPER
    private Payment findPaymentById(Long id) {

        return paymentRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with ID: " + id
                        )
                );
    }

    // ENTITY -> RESPONSE DTO
    private PaymentResponseDTO convertToResponseDTO(
            Payment payment
    ) {

        PaymentResponseDTO responseDTO =
                new PaymentResponseDTO();

        responseDTO.setId(
                payment.getId()
        );

        responseDTO.setAmount(
                payment.getAmount()
        );

        responseDTO.setPaymentMethod(
                payment.getPaymentMethod()
        );

        responseDTO.setStatus(
                payment.getStatus()
        );

        responseDTO.setPaymentDate(
                payment.getPaymentDate()
        );

        responseDTO.setBookingId(
                payment.getBooking().getId()
        );

        responseDTO.setRenovationRequestId(
                payment
                        .getBooking()
                        .getRenovationRequest()
                        .getId()
        );

        responseDTO.setCustomerName(
                payment
                        .getBooking()
                        .getRenovationRequest()
                        .getCustomerName()
        );

        return responseDTO;
    }
}