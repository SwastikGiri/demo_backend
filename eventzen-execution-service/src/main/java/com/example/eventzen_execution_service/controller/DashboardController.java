package com.example.eventzen_execution_service.controller;

import com.example.eventzen_execution_service.dto.EventDashboardSummaryDTO;
import com.example.eventzen_execution_service.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/event/{eventId}")
    public EventDashboardSummaryDTO getEventSummary(@PathVariable Long eventId) {
        return dashboardService.getEventSummary(eventId);
    }
}