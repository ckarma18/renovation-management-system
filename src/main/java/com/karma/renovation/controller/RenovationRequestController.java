package com.karma.renovation.controller;

import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.service.RenovationRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/renovations")
public class RenovationRequestController {

    private final RenovationRequestService renovationRequestService;

    public RenovationRequestController(
            RenovationRequestService renovationRequestService) {
        this.renovationRequestService = renovationRequestService;
    }

    // Create
    @PostMapping
    public RenovationRequest createRenovationRequest(
            @RequestBody RenovationRequest request) {

        return renovationRequestService.createRenovationRequest(request);
    }

    // Read All
    @GetMapping
    public List<RenovationRequest> getAllRenovationRequests() {

        return renovationRequestService.getAllRenovationRequests();
    }

    // Read By ID
    @GetMapping("/{id}")
    public RenovationRequest getRenovationRequestById(
            @PathVariable Long id) {

        return renovationRequestService.getRenovationRequestById(id);
    }

    // Update
    @PutMapping("/{id}")
    public RenovationRequest updateRenovationRequest(
            @PathVariable Long id,
            @RequestBody RenovationRequest updatedRequest) {

        return renovationRequestService.updateRenovationRequest(id, updatedRequest);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteRenovationRequest(
            @PathVariable Long id) {

        renovationRequestService.deleteRenovationRequest(id);

        return "Renovation request deleted successfully.";
    }
}