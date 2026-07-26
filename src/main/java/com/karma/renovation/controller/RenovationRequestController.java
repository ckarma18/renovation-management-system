package com.karma.renovation.controller;

import com.karma.renovation.dto.RenovationRequestDTO;
import com.karma.renovation.dto.RenovationResponseDTO;
import com.karma.renovation.service.RenovationRequestService;
import jakarta.validation.Valid;
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

    @PostMapping
    public RenovationResponseDTO createRenovationRequest(
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        return renovationRequestService
                .createRenovationRequest(requestDTO);
    }

    @GetMapping
    public List<RenovationResponseDTO>
    getAllRenovationRequests() {

        return renovationRequestService
                .getAllRenovationRequests();
    }

    @GetMapping("/{id}")
    public RenovationResponseDTO getRenovationRequestById(
            @PathVariable Long id) {

        return renovationRequestService
                .getRenovationRequestById(id);
    }

    @PutMapping("/{id}")
    public RenovationResponseDTO updateRenovationRequest(
            @PathVariable Long id,
            @Valid @RequestBody RenovationRequestDTO requestDTO) {

        return renovationRequestService
                .updateRenovationRequest(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteRenovationRequest(
            @PathVariable Long id) {

        renovationRequestService
                .deleteRenovationRequest(id);

        return "Renovation request deleted successfully.";
    }
}