package com.karma.renovation.dto;

import java.time.LocalDate;

public class RenovationResponseDTO {

    private Long id;

    private String customerName;

    private String phoneNumber;

    private String propertyAddress;

    private String renovationType;

    private String propertyType;

    private String renovationAreas;

    private LocalDate preferredDate;

    private String description;

    private Double estimatedBudget;

    private String status;

    public RenovationResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPropertyAddress() {
        return propertyAddress;
    }

    public void setPropertyAddress(String propertyAddress) {
        this.propertyAddress = propertyAddress;
    }

    public String getRenovationType() {
        return renovationType;
    }

    public void setRenovationType(String renovationType) {
        this.renovationType = renovationType;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getRenovationAreas() {
        return renovationAreas;
    }

    public void setRenovationAreas(String renovationAreas) {
        this.renovationAreas = renovationAreas;
    }

    public LocalDate getPreferredDate() {
        return preferredDate;
    }

    public void setPreferredDate(LocalDate preferredDate) {
        this.preferredDate = preferredDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getEstimatedBudget() {
        return estimatedBudget;
    }

    public void setEstimatedBudget(Double estimatedBudget) {
        this.estimatedBudget = estimatedBudget;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}