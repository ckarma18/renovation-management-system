package com.karma.renovation.dto;

import com.karma.renovation.entity.Notification;
import com.karma.renovation.entity.Payment;
import com.karma.renovation.entity.RenovationRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

    @Valid
    @NotNull(message = "Renovation request is required")
    private RenovationRequest renovationRequest;

    @Valid
    @NotNull(message = "Payment information is required")
    private Payment payment;

    @Valid
    @NotNull(message = "Notification information is required")
    private Notification notification;
}