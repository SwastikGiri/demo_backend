package com.example.eventzen_execution_service.service;

import com.example.eventzen_execution_service.entity.EventExecution;
import com.example.eventzen_execution_service.repository.EventExecutionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EventExecutionService {

    private final EventExecutionRepository repository;

    public EventExecutionService(EventExecutionRepository repository) {
        this.repository = repository;
    }

    // Start event
    public EventExecution createExecution(EventExecution execution) {
        execution.setStatus("IN_PROGRESS");
        execution.setStartTime(LocalDateTime.now());
        return repository.save(execution);
    }

    // Complete event
    public EventExecution completeEvent(Long eventId) {
        Optional<EventExecution> optional = repository.findById(eventId);

        if (optional.isEmpty()) {
            throw new RuntimeException("Event not found for given ID");
        }

        EventExecution event = optional.get();
        event.setStatus("COMPLETED");
        event.setEndTime(LocalDateTime.now());

        return repository.save(event);
    }
}