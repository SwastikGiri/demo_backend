package com.example.eventzen_execution_service.dto;

import lombok.Data;

@Data
public class VendorTaskUpdateRequestDTO {
    private String status;
    private String rejectionReason;
    private String notes;
}