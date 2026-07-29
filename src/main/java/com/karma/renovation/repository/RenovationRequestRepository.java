package com.karma.renovation.repository;

import com.karma.renovation.entity.RenovationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RenovationRequestRepository
        extends JpaRepository<RenovationRequest, Long> {

    List<RenovationRequest> findByCustomerNameContainingIgnoreCase(String customerName);

}