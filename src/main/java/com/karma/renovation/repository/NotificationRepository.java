package com.karma.renovation.repository;

import com.karma.renovation.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // CUSTOMER - own notifications
    List<Notification> findByUser_UsernameOrderByCreatedAtDesc(
            String username
    );

    // ADMIN - all notifications newest first
    List<Notification> findAllByOrderByCreatedAtDesc();
}