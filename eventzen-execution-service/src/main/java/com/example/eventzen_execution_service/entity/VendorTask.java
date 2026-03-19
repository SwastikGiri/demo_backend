package com.example.eventzen_execution_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vendor_tasks")
@Data
public class VendorTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    private Long vendorId;

    private String serviceType;

    private String taskName;

    private String notes;

    private String status; // PENDING, ACCEPTED, IN_PROGRESS, COMPLETED, REJECTED

    private String rejectionReason;
}