package com.example.eventzen_execution_service.dto;

import lombok.Data;

@Data
public class ExpenseRequestDTO {

    private Long eventId;
    private String category;
    private Double amount;
    private String description;
}