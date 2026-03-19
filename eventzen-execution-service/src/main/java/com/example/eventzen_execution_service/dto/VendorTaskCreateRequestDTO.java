package com.example.eventzen_execution_service.dto;

import lombok.Data;

@Data
public class VendorTaskCreateRequestDTO {
    private Long eventId;
    private Long vendorId;
    private String serviceType;
    private String taskName;
    private String notes;
}