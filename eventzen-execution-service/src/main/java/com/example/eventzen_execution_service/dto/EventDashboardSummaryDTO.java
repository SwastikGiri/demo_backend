package com.example.eventzen_execution_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventDashboardSummaryDTO {
    private Long eventId;
    private String executionStatus;
    private Long totalTasks;
    private Long completedTasks;
    private Double totalExpenses;
}