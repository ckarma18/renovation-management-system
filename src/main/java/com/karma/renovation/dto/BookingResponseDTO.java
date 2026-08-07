package com.karma.renovation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {

    private Long id;

    private LocalDate bookingDate;

    private LocalTime bookingTime;

    private String status;

    private Long renovationRequestId;

    private String customerName;
}