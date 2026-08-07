package com.karma.renovation.repository;

import com.karma.renovation.entity.Booking;
import com.karma.renovation.entity.RenovationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByRenovationRequest(
            RenovationRequest renovationRequest
    );

    List<Booking> findByRenovationRequest_User_Username(
            String username
    );
}