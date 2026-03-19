package com.example.eventzen_execution_service.service;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.example.eventzen_execution_service.repository.ExpenseRepository;
import com.example.eventzen_execution_service.entity.Expense;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public Expense addExpense(Expense expense) {
        expense.setCreatedAt(LocalDateTime.now());
        return repo.save(expense);
    }

    public List<Expense> getByEvent(Long eventId) {
        return repo.findByEventId(eventId);
    }
}
