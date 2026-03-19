package com.example.eventzen_execution_service.repository;

import com.example.eventzen_execution_service.entity.EventExecution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventExecutionRepository extends JpaRepository<EventExecution, Long> {
    Optional<EventExecution> findByEventId(Long eventId);
}