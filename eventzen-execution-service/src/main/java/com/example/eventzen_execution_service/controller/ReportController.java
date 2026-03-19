package com.example.eventzen_execution_service.controller;

import com.example.eventzen_execution_service.dto.FinancialReportResponseDTO;
import com.example.eventzen_execution_service.service.NodeIntegrationService;
import com.example.eventzen_execution_service.service.ReportService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService service;
    private final NodeIntegrationService nodeIntegrationService;

    public ReportController(ReportService service, NodeIntegrationService nodeIntegrationService) {
        this.service = service;
        this.nodeIntegrationService = nodeIntegrationService;
    }

    @GetMapping("/{eventId}/expenses-total")
    public Double getTotalExpense(@PathVariable Long eventId) {
        return service.calculateTotalExpense(eventId);
    }

    @GetMapping("/{eventId}")
    public FinancialReportResponseDTO getFinancialReport(
            @PathVariable Long eventId,
            @RequestParam Double estimatedAmount
    ) {
        return service.generateFinancialReport(eventId, estimatedAmount);
    }

    @GetMapping("/{eventId}/auto")
    public FinancialReportResponseDTO getFinancialReportAuto(
            @PathVariable Long eventId,
            HttpServletRequest request
    ) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization token is required");
        }

        String token = authHeader.substring(7);
        Double estimatedAmount = nodeIntegrationService.fetchEstimatedAmount(eventId, token);

        return service.generateFinancialReport(eventId, estimatedAmount);
    }
}