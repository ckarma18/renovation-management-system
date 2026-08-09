package com.karma.renovation.controller;

import com.karma.renovation.dto.NotificationResponseDTO;
import com.karma.renovation.response.ApiResponse;
import com.karma.renovation.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService
    ) {
        this.notificationService = notificationService;
    }

    // CUSTOMER - VIEW OWN NOTIFICATIONS
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<NotificationResponseDTO>>>
    getMyNotifications(
            Authentication authentication
    ) {

        List<NotificationResponseDTO> notifications =
                notificationService.getMyNotifications(
                        authentication.getName()
                );

        ApiResponse<List<NotificationResponseDTO>> response =
                new ApiResponse<>(
                        true,
                        "My notifications fetched successfully.",
                        notifications
                );

        return ResponseEntity.ok(response);
    }

    // CUSTOMER - MARK NOTIFICATION AS READ
    @PreAuthorize("hasRole('CUSTOMER')")
    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<NotificationResponseDTO>>
    markNotificationAsRead(
            @PathVariable Long id,
            Authentication authentication
    ) {

        NotificationResponseDTO notification =
                notificationService.markAsRead(
                        id,
                        authentication.getName()
                );

        ApiResponse<NotificationResponseDTO> response =
                new ApiResponse<>(
                        true,
                        "Notification marked as read.",
                        notification
                );

        return ResponseEntity.ok(response);
    }
}