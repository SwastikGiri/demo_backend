package com.example.eventzen_execution_service.repository;

import com.example.eventzen_execution_service.entity.FinancialReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinancialReportRepository extends JpaRepository<FinancialReport, Long> {
}