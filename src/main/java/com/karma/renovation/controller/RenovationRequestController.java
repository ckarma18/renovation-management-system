package com.karma.renovation.controller;

import com.karma.renovation.dto.RenovationRequestDTO;
import com.karma.renovation.dto.RenovationResponseDTO;
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

    public RenovationRequestController(
            RenovationRequestService renovationRequestService) {

        this.renovationRequestService =
                renovationRequestService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<RenovationResponseDTO>
    createRenovationRequest(
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        RenovationResponseDTO createdRequest =
                renovationRequestService
                        .createRenovationRequest(requestDTO);

        return new ResponseEntity<>(
                createdRequest,
                HttpStatus.CREATED
        );
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<RenovationResponseDTO>>
    getAllRenovationRequests() {

        List<RenovationResponseDTO> requests =
                renovationRequestService
                        .getAllRenovationRequests();

        return ResponseEntity.ok(requests);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<RenovationResponseDTO>
    getRenovationRequestById(
            @PathVariable Long id) {

        RenovationResponseDTO request =
                renovationRequestService
                        .getRenovationRequestById(id);

        return ResponseEntity.ok(request);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<RenovationResponseDTO>
    updateRenovationRequest(
            @PathVariable Long id,
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        RenovationResponseDTO updatedRequest =
                renovationRequestService
                        .updateRenovationRequest(id, requestDTO);

        return ResponseEntity.ok(updatedRequest);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRenovationRequest(
            @PathVariable Long id) {

        renovationRequestService
                .deleteRenovationRequest(id);

        return ResponseEntity.noContent().build();
    }
}