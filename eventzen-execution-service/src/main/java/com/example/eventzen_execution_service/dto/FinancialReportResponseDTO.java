package com.example.eventzen_execution_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinancialReportResponseDTO {
    private Long eventId;
    private Double totalEstimated;
    private Double totalActual;
    private Double profitOrLoss;
}