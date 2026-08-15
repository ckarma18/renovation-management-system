package com.karma.renovation.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RenovationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Property address is required")
    private String propertyAddress;

    // Example:
    // FULL_RENOVATION, PARTIAL_RENOVATION,
    // SINGLE_AREA, REMODEL, REPAIR_RESTORATION
    @NotBlank(message = "Renovation type is required")
    private String renovationType;

    // HOUSE, APARTMENT, OFFICE, SHOP, OTHER
    private String propertyType;

    // Example:
    // Kitchen, Bathroom / Toilet, Flooring
    @Column(length = 1000)
    private String renovationAreas;

    private LocalDate preferredDate;

    @Column(length = 3000)
    private String description;

    private Double estimatedBudget;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}