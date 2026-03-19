package com.example.eventzen_execution_service.repository;

import com.example.eventzen_execution_service.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByEventId(Long eventId);
}