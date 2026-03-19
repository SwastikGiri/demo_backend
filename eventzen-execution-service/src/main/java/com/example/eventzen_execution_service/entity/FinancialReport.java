package com.example.eventzen_execution_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "financial_reports")
@Data
public class FinancialReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    private Double totalEstimated;

    private Double totalActual;

    private Double profitOrLoss;
}