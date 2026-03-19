package com.example.eventzen_execution_service.controller;
import org.springframework.web.bind.annotation.*;
import com.example.eventzen_execution_service.service.EventExecutionService;
import com.example.eventzen_execution_service.entity.EventExecution;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/execution")
public class EventExecutionController {

    private final EventExecutionService service;

    public EventExecutionController(EventExecutionService service) {
        this.service = service;
    }

    @PostMapping("/start")
    public EventExecution start(@RequestBody EventExecution e) {
        e.setStatus("IN_PROGRESS");
        e.setStartTime(LocalDateTime.now());
        return service.createExecution(e);
    }

    @PostMapping("/complete/{eventId}")
    public EventExecution complete(@PathVariable Long eventId) {
        return service.completeEvent(eventId);
    }
}