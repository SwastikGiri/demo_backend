package com.example.eventzen_execution_service.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.eventzen_execution_service.service.ExpenseService;
import com.example.eventzen_execution_service.entity.Expense;
import com.example.eventzen_execution_service.dto.ExpenseRequestDTO;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    public Expense add(@RequestBody ExpenseRequestDTO dto) {

        Expense expense = new Expense();
        expense.setEventId(dto.getEventId());
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setDescription(dto.getDescription());

        return service.addExpense(expense);
    }

    @GetMapping("/{eventId}")
    public List<Expense> get(@PathVariable Long eventId) {
        return service.getByEvent(eventId);
    }
}