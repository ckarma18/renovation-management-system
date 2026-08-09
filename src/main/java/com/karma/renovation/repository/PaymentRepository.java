package com.karma.renovation.repository;

import com.karma.renovation.entity.Booking;
import com.karma.renovation.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBooking(Booking booking);

    List<Payment> findByBooking_RenovationRequest_User_Username(
            String username
    );
}