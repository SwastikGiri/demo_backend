package com.example.eventzen_execution_service.service;

import com.example.eventzen_execution_service.dto.FinancialReportResponseDTO;
import com.example.eventzen_execution_service.entity.Expense;
import com.example.eventzen_execution_service.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ExpenseRepository expenseRepository;

    public ReportService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Double calculateTotalExpense(Long eventId) {
        List<Expense> expenses = expenseRepository.findByEventId(eventId);

        return expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public FinancialReportResponseDTO generateFinancialReport(Long eventId, Double totalEstimated) {
        Double totalActual = calculateTotalExpense(eventId);
        Double profitOrLoss = totalEstimated - totalActual;

        return new FinancialReportResponseDTO(
                eventId,
                totalEstimated,
                totalActual,
                profitOrLoss
        );
    }
}