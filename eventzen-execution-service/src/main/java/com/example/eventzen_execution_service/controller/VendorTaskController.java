package com.example.eventzen_execution_service.controller;

import com.example.eventzen_execution_service.dto.VendorTaskCreateRequestDTO;
import com.example.eventzen_execution_service.dto.VendorTaskUpdateRequestDTO;
import com.example.eventzen_execution_service.entity.VendorTask;
import com.example.eventzen_execution_service.service.VendorTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor-tasks")
public class VendorTaskController {

    private final VendorTaskService vendorTaskService;

    public VendorTaskController(VendorTaskService vendorTaskService) {
        this.vendorTaskService = vendorTaskService;
    }

    @PostMapping
    public VendorTask createTask(@RequestBody VendorTaskCreateRequestDTO dto) {
        return vendorTaskService.createTask(dto);
    }

    @GetMapping("/event/{eventId}")
    public List<VendorTask> getTasksByEvent(@PathVariable Long eventId) {
        return vendorTaskService.getTasksByEvent(eventId);
    }

    @GetMapping("/my")
    public List<VendorTask> getMyTasks() {
        return vendorTaskService.getMyTasks();
    }

    @PatchMapping("/{taskId}")
    public VendorTask updateMyTask(@PathVariable Long taskId,
                                   @RequestBody VendorTaskUpdateRequestDTO dto) {
        return vendorTaskService.updateMyTask(taskId, dto);
    }
}