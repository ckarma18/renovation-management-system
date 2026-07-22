package com.karma.renovation.repository;

import com.karma.renovation.entity.RenovationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RenovationRequestRepository
        extends JpaRepository<RenovationRequest, Long> {

}