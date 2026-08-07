package com.karma.renovation.repository;

import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.RenovationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RenovationRequestRepository
        extends JpaRepository<RenovationRequest, Long> {

    List<RenovationRequest>
    findByCustomerNameContainingIgnoreCase(String customerName);

    List<RenovationRequest> findByUser(AppUser user);
}