package com.example.eventzen_execution_service.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "event_execution")
@Data
public class EventExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    private String status; // PLANNED, IN_PROGRESS, COMPLETED

    private LocalDateTime startTime;
    private LocalDateTime endTime;
}