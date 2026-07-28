package com.karma.renovation.controller;

import com.karma.renovation.dto.RenovationRequestDTO;
import com.karma.renovation.dto.RenovationResponseDTO;
import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.service.RenovationRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/renovations")
public class RenovationRequestController {

    private final RenovationRequestService renovationRequestService;

    public RenovationRequestController(RenovationRequestService renovationRequestService) {
        this.renovationRequestService = renovationRequestService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<RenovationResponseDTO>> createRenovationRequest(
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        RenovationResponseDTO createdRequest =
                renovationRequestService.createRenovationRequest(requestDTO);

        ApiResponse<RenovationResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Renovation request created successfully.",
                        createdRequest
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<RenovationResponseDTO>>> getAllRenovationRequests() {

        List<RenovationResponseDTO> requests =
                renovationRequestService.getAllRenovationRequests();

        ApiResponse<List<RenovationResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "Renovation requests fetched successfully.",
                        requests
                );

        return ResponseEntity.ok(response);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RenovationResponseDTO>> getRenovationRequestById(
            @PathVariable Long id) {

        RenovationResponseDTO responseDTO =
                renovationRequestService.getRenovationRequestById(id);

        ApiResponse<RenovationResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Renovation request fetched successfully.",
                        responseDTO
                );

        return ResponseEntity.ok(response);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RenovationResponseDTO>> updateRenovationRequest(
            @PathVariable Long id,
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        RenovationResponseDTO updatedRequest =
                renovationRequestService.updateRenovationRequest(id, requestDTO);

        ApiResponse<RenovationResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Renovation request updated successfully.",
                        updatedRequest
                );

        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRenovationRequest(
            @PathVariable Long id) {

        renovationRequestService.deleteRenovationRequest(id);

        ApiResponse<String> response =
                new ApiResponse<>(
                        true,
                        "Renovation request deleted successfully.",
                        null
                );

        return ResponseEntity.ok(response);
    }
}