package com.karma.renovation.service;

import com.karma.renovation.dto.RenovationRequestDTO;
import com.karma.renovation.dto.RenovationResponseDTO;
import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.repository.RenovationRequestRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RenovationRequestService {

    private final RenovationRequestRepository renovationRequestRepository;

    public RenovationRequestService(
            RenovationRequestRepository renovationRequestRepository) {

        this.renovationRequestRepository =
                renovationRequestRepository;
    }

    // CREATE
    public RenovationResponseDTO createRenovationRequest(
            RenovationRequestDTO requestDTO) {

        RenovationRequest request = new RenovationRequest();

        request.setCustomerName(requestDTO.getCustomerName());
        request.setPhoneNumber(requestDTO.getPhoneNumber());
        request.setPropertyAddress(requestDTO.getPropertyAddress());
        request.setRenovationType(requestDTO.getRenovationType());
        request.setEstimatedBudget(requestDTO.getEstimatedBudget());

        // A newly created request always starts as PENDING
        request.setStatus("PENDING");

        RenovationRequest savedRequest =
                renovationRequestRepository.save(request);

        return convertToResponseDTO(savedRequest);
    }

    // READ ALL
    public List<RenovationResponseDTO> getAllRenovationRequests() {

        List<RenovationRequest> requests =
                renovationRequestRepository.findAll();

        List<RenovationResponseDTO> responseDTOList =
                new ArrayList<>();

        for (RenovationRequest request : requests) {
            responseDTOList.add(convertToResponseDTO(request));
        }

        return responseDTOList;
    }

    // READ BY ID
    public RenovationResponseDTO getRenovationRequestById(Long id) {

        RenovationRequest request =
                findRenovationRequestById(id);

        return convertToResponseDTO(request);
    }

    // UPDATE
    public RenovationResponseDTO updateRenovationRequest(
            Long id,
            RenovationRequestDTO requestDTO) {

        RenovationRequest existingRequest =
                findRenovationRequestById(id);

        existingRequest.setCustomerName(
                requestDTO.getCustomerName());

        existingRequest.setPhoneNumber(
                requestDTO.getPhoneNumber());

        existingRequest.setPropertyAddress(
                requestDTO.getPropertyAddress());

        existingRequest.setRenovationType(
                requestDTO.getRenovationType());

        existingRequest.setEstimatedBudget(
                requestDTO.getEstimatedBudget());

        /*
         * Our current request DTO contains status.
         * Therefore, PUT can update the status too.
         */
        existingRequest.setStatus(
                requestDTO.getStatus());

        RenovationRequest updatedRequest =
                renovationRequestRepository.save(existingRequest);

        return convertToResponseDTO(updatedRequest);
    }

    // DELETE
    public void deleteRenovationRequest(Long id) {

        /*
         * Find the entity first.
         * If it does not exist, findRenovationRequestById()
         * throws an exception.
         */
        RenovationRequest request =
                findRenovationRequestById(id);

        renovationRequestRepository.delete(request);
    }

    // Reusable method for finding an entity
    private RenovationRequest findRenovationRequestById(Long id) {

        return renovationRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Renovation request not found with ID: "
                                        + id));
    }

    // Convert Entity to Response DTO
    private RenovationResponseDTO convertToResponseDTO(
            RenovationRequest request) {

        RenovationResponseDTO responseDTO =
                new RenovationResponseDTO();

        responseDTO.setId(request.getId());
        responseDTO.setCustomerName(request.getCustomerName());
        responseDTO.setPhoneNumber(request.getPhoneNumber());
        responseDTO.setPropertyAddress(
                request.getPropertyAddress());
        responseDTO.setRenovationType(
                request.getRenovationType());
        responseDTO.setEstimatedBudget(
                request.getEstimatedBudget());
        responseDTO.setStatus(request.getStatus());

        return responseDTO;
    }
}