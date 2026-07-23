package com.karma.renovation.service;

import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.repository.RenovationRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RenovationRequestService {

    private final RenovationRequestRepository renovationRequestRepository;

    public RenovationRequestService(
            RenovationRequestRepository renovationRequestRepository) {
        this.renovationRequestRepository = renovationRequestRepository;
    }

    public RenovationRequest createRenovationRequest(
            RenovationRequest request) {

        request.setStatus("PENDING");

        return renovationRequestRepository.save(request);
    }

    public List<RenovationRequest> getAllRenovationRequests() {
        return renovationRequestRepository.findAll();
    }
}