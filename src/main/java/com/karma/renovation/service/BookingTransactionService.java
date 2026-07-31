package com.karma.renovation.service;

import com.karma.renovation.entity.Notification;
import com.karma.renovation.entity.Payment;
import com.karma.renovation.entity.RenovationRequest;
import com.karma.renovation.repository.NotificationRepository;
import com.karma.renovation.repository.PaymentRepository;
import com.karma.renovation.repository.RenovationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingTransactionService {

    private final RenovationRequestRepository renovationRequestRepository;
    private final PaymentRepository paymentRepository;
    private final NotificationRepository notificationRepository;

    @Transactional
    public void bookRenovation(
            RenovationRequest renovationRequest,
            Payment payment,
            Notification notification
    ) {
        renovationRequestRepository.save(renovationRequest);

        paymentRepository.save(payment);

        notificationRepository.save(notification);
    }
}