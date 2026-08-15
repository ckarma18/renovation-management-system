package com.karma.renovation.service;

import com.karma.renovation.dto.NotificationResponseDTO;
import com.karma.renovation.entity.AppUser;
import com.karma.renovation.entity.Notification;
import com.karma.renovation.exception.ResourceNotFoundException;
import com.karma.renovation.repository.AppUserRepository;
import com.karma.renovation.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final AppUserRepository appUserRepository;

    public NotificationService(
            NotificationRepository notificationRepository,
            AppUserRepository appUserRepository
    ) {
        this.notificationRepository = notificationRepository;
        this.appUserRepository = appUserRepository;
    }

    // CREATE NOTIFICATION
    public NotificationResponseDTO createNotification(
            String username,
            String title,
            String message
    ) {

        AppUser user = appUserRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with username: " + username
                        )
                );

        Notification notification = new Notification();

        notification.setTitle(title);
        notification.setMessage(message);
        notification.setSent(true);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setUser(user);

        Notification savedNotification =
                notificationRepository.save(notification);

        return convertToResponseDTO(savedNotification);
    }

    // CUSTOMER - GET OWN NOTIFICATIONS
    public List<NotificationResponseDTO> getMyNotifications(
            String username
    ) {

        return notificationRepository
                .findByUser_UsernameOrderByCreatedAtDesc(
                        username
                )
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // ADMIN - GET ALL NOTIFICATIONS
    public List<NotificationResponseDTO> getAllNotifications() {

        return notificationRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // CUSTOMER - MARK NOTIFICATION AS READ
    public NotificationResponseDTO markAsRead(
            Long id,
            String username
    ) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found with ID: " + id
                                )
                        );

        // Make sure this notification belongs to
        // the currently logged-in customer.
        if (!notification
                .getUser()
                .getUsername()
                .equals(username)) {

            throw new IllegalArgumentException(
                    "You cannot access this notification"
            );
        }

        notification.setRead(true);

        Notification updatedNotification =
                notificationRepository.save(
                        notification
                );

        return convertToResponseDTO(
                updatedNotification
        );
    }

    // ENTITY -> RESPONSE DTO
    private NotificationResponseDTO convertToResponseDTO(
            Notification notification
    ) {

        NotificationResponseDTO responseDTO =
                new NotificationResponseDTO();

        responseDTO.setId(
                notification.getId()
        );

        responseDTO.setTitle(
                notification.getTitle()
        );

        responseDTO.setMessage(
                notification.getMessage()
        );

        responseDTO.setSent(
                notification.isSent()
        );

        responseDTO.setRead(
                notification.isRead()
        );

        responseDTO.setCreatedAt(
                notification.getCreatedAt()
        );

        responseDTO.setUsername(
                notification
                        .getUser()
                        .getUsername()
        );

        return responseDTO;
    }
}