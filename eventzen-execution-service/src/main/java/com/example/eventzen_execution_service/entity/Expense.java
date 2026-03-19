package com.example.eventzen_execution_service.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    private String category; // CATERING, DECORATION etc

    private Double amount;

    private String description;

    private LocalDateTime createdAt;
}
