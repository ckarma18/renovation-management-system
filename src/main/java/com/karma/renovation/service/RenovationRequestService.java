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
        this.renovationRequestRepository =
                renovationRequestRepository;
    }

    public RenovationRequest createRenovationRequest(
            RenovationRequest request) {

        request.setStatus("PENDING");

        return renovationRequestRepository.save(request);
    }

    public List<RenovationRequest> getAllRenovationRequests() {
        return renovationRequestRepository.findAll();
    }

    public RenovationRequest getRenovationRequestById(Long id) {
        return renovationRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Renovation request not found"));
    }

    public RenovationRequest updateRenovationRequest(
            Long id,
            RenovationRequest updatedRequest) {

        RenovationRequest existingRequest =
                renovationRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Renovation request not found"));

        existingRequest.setCustomerName(
                updatedRequest.getCustomerName());

        existingRequest.setPhoneNumber(
                updatedRequest.getPhoneNumber());

        existingRequest.setPropertyAddress(
                updatedRequest.getPropertyAddress());

        existingRequest.setRenovationType(
                updatedRequest.getRenovationType());

        existingRequest.setEstimatedBudget(
                updatedRequest.getEstimatedBudget());

        existingRequest.setStatus(
                updatedRequest.getStatus());

        return renovationRequestRepository.save(existingRequest);
    }
}