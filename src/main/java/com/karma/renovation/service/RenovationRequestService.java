package com.karma.renovation.service;

import com.karma.renovation.dto.RenovationRequestDTO;
import com.karma.renovation.dto.RenovationResponseDTO;
import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.exception.ResourceNotFoundException;
import com.karma.renovation.repository.AppUserRepository;
import com.karma.renovation.repository.RenovationRequestRepository;
import com.karma.renovation.response.PaginationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RenovationRequestService {

    private static final Logger logger =
            LoggerFactory.getLogger(RenovationRequestService.class);

    private final RenovationRequestRepository renovationRequestRepository;
    private final AppUserRepository appUserRepository;

    public RenovationRequestService(
            RenovationRequestRepository renovationRequestRepository,
            AppUserRepository appUserRepository
    ) {
        this.renovationRequestRepository = renovationRequestRepository;
        this.appUserRepository = appUserRepository;
    }

    // CREATE
    public RenovationResponseDTO createRenovationRequest(
            RenovationRequestDTO requestDTO
    ) {

        String username = getAuthenticatedUsername();

        AppUser appUser = appUserRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found: " + username
                        )
                );

        logger.info(
                "Creating renovation request for authenticated user: {}",
                username
        );

        RenovationRequest renovationRequest = new RenovationRequest();

        renovationRequest.setCustomerName(requestDTO.getCustomerName());
        renovationRequest.setPhoneNumber(requestDTO.getPhoneNumber());
        renovationRequest.setPropertyAddress(requestDTO.getPropertyAddress());
        renovationRequest.setRenovationType(requestDTO.getRenovationType());
        renovationRequest.setEstimatedBudget(requestDTO.getEstimatedBudget());
        renovationRequest.setStatus(requestDTO.getStatus());

        // Link this request to the logged-in user
        renovationRequest.setUser(appUser);

        RenovationRequest savedRequest =
                renovationRequestRepository.save(renovationRequest);

        logger.info(
                "Renovation request created successfully with ID: {} for user: {}",
                savedRequest.getId(),
                username
        );

        return convertToResponseDTO(savedRequest);
    }

    // READ ALL WITH PAGINATION AND SORTING
    public PaginationResponse<RenovationResponseDTO> getAllRenovationRequests(
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {

        logger.info(
                "Fetching renovation requests - page: {}, size: {}, sortBy: {}, sortDir: {}",
                page,
                size,
                sortBy,
                sortDir
        );

        Sort sort;

        if (sortDir.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<RenovationRequest> renovationPage =
                renovationRequestRepository.findAll(pageable);

        var renovationDTOs = renovationPage.getContent()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();

        return new PaginationResponse<>(
                renovationDTOs,
                renovationPage.getNumber(),
                renovationPage.getSize(),
                renovationPage.getTotalElements(),
                renovationPage.getTotalPages(),
                renovationPage.isFirst(),
                renovationPage.isLast()
        );
    }

    // READ BY ID
    public RenovationResponseDTO getRenovationRequestById(Long id) {

        logger.info("Fetching renovation request with ID: {}", id);

        RenovationRequest renovationRequest =
                findRenovationRequestById(id);

        return convertToResponseDTO(renovationRequest);
    }

    // SEARCH BY CUSTOMER NAME
    public List<RenovationResponseDTO> searchByCustomerName(
            String customerName
    ) {

        logger.info(
                "Searching renovation requests by customer name: {}",
                customerName
        );

        List<RenovationRequest> requests =
                renovationRequestRepository
                        .findByCustomerNameContainingIgnoreCase(customerName);

        return requests.stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // UPDATE
    public RenovationResponseDTO updateRenovationRequest(
            Long id,
            RenovationRequestDTO requestDTO
    ) {

        logger.info("Updating renovation request with ID: {}", id);

        RenovationRequest renovationRequest =
                findRenovationRequestById(id);

        renovationRequest.setCustomerName(requestDTO.getCustomerName());
        renovationRequest.setPhoneNumber(requestDTO.getPhoneNumber());
        renovationRequest.setPropertyAddress(requestDTO.getPropertyAddress());
        renovationRequest.setRenovationType(requestDTO.getRenovationType());
        renovationRequest.setEstimatedBudget(requestDTO.getEstimatedBudget());
        renovationRequest.setStatus(requestDTO.getStatus());

        RenovationRequest updatedRequest =
                renovationRequestRepository.save(renovationRequest);

        logger.info(
                "Renovation request updated successfully with ID: {}",
                updatedRequest.getId()
        );

        return convertToResponseDTO(updatedRequest);
    }

    // DELETE
    public void deleteRenovationRequest(Long id) {

        logger.info("Deleting renovation request with ID: {}", id);

        RenovationRequest renovationRequest =
                findRenovationRequestById(id);

        renovationRequestRepository.delete(renovationRequest);

        logger.info(
                "Renovation request deleted successfully with ID: {}",
                id
        );
    }

    // Helper Method
    private RenovationRequest findRenovationRequestById(Long id) {

        return renovationRequestRepository.findById(id)
                .orElseThrow(() -> {

                    logger.error(
                            "Renovation request not found with ID: {}",
                            id
                    );

                    return new ResourceNotFoundException(
                            "Renovation request not found with ID: " + id
                    );
                });
    }

    // Get logged-in username from Spring Security
    private String getAuthenticatedUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {

            throw new IllegalStateException(
                    "No authenticated user found"
            );
        }

        return authentication.getName();
    }

    // Entity -> Response DTO
    private RenovationResponseDTO convertToResponseDTO(
            RenovationRequest renovationRequest
    ) {

        RenovationResponseDTO responseDTO =
                new RenovationResponseDTO();

        responseDTO.setId(renovationRequest.getId());
        responseDTO.setCustomerName(
                renovationRequest.getCustomerName()
        );
        responseDTO.setPhoneNumber(
                renovationRequest.getPhoneNumber()
        );
        responseDTO.setPropertyAddress(
                renovationRequest.getPropertyAddress()
        );
        responseDTO.setRenovationType(
                renovationRequest.getRenovationType()
        );
        responseDTO.setEstimatedBudget(
                renovationRequest.getEstimatedBudget()
        );
        responseDTO.setStatus(
                renovationRequest.getStatus()
        );

        return responseDTO;
    }

    public List<RenovationResponseDTO> getMyRenovationRequests() {

        String username = getAuthenticatedUsername();

        AppUser appUser = appUserRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found: " + username
                        )
                );

        List<RenovationRequest> requests =
                renovationRequestRepository.findByUser(appUser);

        return requests.stream()
                .map(this::convertToResponseDTO)
                .toList();
    }
}