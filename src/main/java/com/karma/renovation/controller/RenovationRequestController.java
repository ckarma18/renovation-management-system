package com.karma.renovation.controller;

import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.service.RenovationRequestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/renovations")
public class RenovationRequestController {

    private final RenovationRequestService renovationRequestService;

    public RenovationRequestController(
            RenovationRequestService renovationRequestService) {
        this.renovationRequestService = renovationRequestService;
    }

    @PostMapping
    public RenovationRequest createRenovationRequest(
            @RequestBody RenovationRequest request) {

        return renovationRequestService.createRenovationRequest(request);
    }

    @GetMapping
    public List<RenovationRequest> getAllRenovationRequests() {
        return renovationRequestService.getAllRenovationRequests();
    }
}