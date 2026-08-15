package com.karma.renovation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {

    private Long id;

    private String title;

    private String message;

    private boolean sent;

    private boolean read;

    private LocalDateTime createdAt;

    // Customer who received the notification
    private String username;
}