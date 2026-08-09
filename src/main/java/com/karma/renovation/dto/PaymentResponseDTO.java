package com.karma.renovation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {

    private Long id;

    private Double amount;

    private String paymentMethod;

    private String status;

    private LocalDateTime paymentDate;

    private Long bookingId;

    private Long renovationRequestId;

    private String customerName;
}