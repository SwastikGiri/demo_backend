package com.example.eventzen_execution_service.service;

import com.example.eventzen_execution_service.dto.EventDashboardSummaryDTO;
import com.example.eventzen_execution_service.entity.EventExecution;
import com.example.eventzen_execution_service.entity.VendorTask;
import com.example.eventzen_execution_service.repository.EventExecutionRepository;
import com.example.eventzen_execution_service.repository.ExpenseRepository;
import com.example.eventzen_execution_service.repository.VendorTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final EventExecutionRepository eventExecutionRepository;
    private final VendorTaskRepository vendorTaskRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardService(EventExecutionRepository eventExecutionRepository,
                            VendorTaskRepository vendorTaskRepository,
                            ExpenseRepository expenseRepository) {
        this.eventExecutionRepository = eventExecutionRepository;
        this.vendorTaskRepository = vendorTaskRepository;
        this.expenseRepository = expenseRepository;
    }

    public EventDashboardSummaryDTO getEventSummary(Long eventId) {
        String executionStatus = eventExecutionRepository.findByEventId(eventId)
                .map(EventExecution::getStatus)
                .orElse("NOT_STARTED");

        List<VendorTask> tasks = vendorTaskRepository.findByEventId(eventId);

        long totalTasks = tasks.size();
        long completedTasks = tasks.stream()
                .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .count();

        double totalExpenses = expenseRepository.findByEventId(eventId)
                .stream()
                .mapToDouble(exp -> exp.getAmount() != null ? exp.getAmount() : 0.0)
                .sum();

        return new EventDashboardSummaryDTO(
                eventId,
                executionStatus,
                totalTasks,
                completedTasks,
                totalExpenses
        );
    }
}