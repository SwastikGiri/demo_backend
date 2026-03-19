package com.example.eventzen_execution_service.service;

import com.example.eventzen_execution_service.dto.VendorTaskCreateRequestDTO;
import com.example.eventzen_execution_service.dto.VendorTaskUpdateRequestDTO;
import com.example.eventzen_execution_service.entity.VendorTask;
import com.example.eventzen_execution_service.repository.VendorTaskRepository;
import com.example.eventzen_execution_service.security.SecurityHelper;
import com.example.eventzen_execution_service.security.UserContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorTaskService {

    private final VendorTaskRepository vendorTaskRepository;

    public VendorTaskService(VendorTaskRepository vendorTaskRepository) {
        this.vendorTaskRepository = vendorTaskRepository;
    }

    public VendorTask createTask(VendorTaskCreateRequestDTO dto) {
        VendorTask task = new VendorTask();
        task.setEventId(dto.getEventId());
        task.setVendorId(dto.getVendorId());
        task.setServiceType(dto.getServiceType());
        task.setTaskName(dto.getTaskName());
        task.setNotes(dto.getNotes());
        task.setStatus("PENDING");
        return vendorTaskRepository.save(task);
    }

    public List<VendorTask> getTasksByEvent(Long eventId) {
        return vendorTaskRepository.findByEventId(eventId);
    }

    public List<VendorTask> getMyTasks() {
        UserContext user = SecurityHelper.getCurrentUser();
        return vendorTaskRepository.findByVendorId(user.getUserId());
    }

    public VendorTask updateMyTask(Long taskId, VendorTaskUpdateRequestDTO dto) {
        UserContext user = SecurityHelper.getCurrentUser();

        VendorTask task = vendorTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Vendor task not found"));

        if (!task.getVendorId().equals(user.getUserId())) {
            throw new RuntimeException("You can update only your own tasks");
        }

        if ("REJECTED".equalsIgnoreCase(dto.getStatus())
                && (dto.getRejectionReason() == null || dto.getRejectionReason().trim().isEmpty())) {
            throw new RuntimeException("Rejection reason is required when rejecting a task");
        }

        if (dto.getStatus() != null && !dto.getStatus().trim().isEmpty()) {
            task.setStatus(dto.getStatus().toUpperCase());
        }

        if (dto.getNotes() != null) {
            task.setNotes(dto.getNotes());
        }

        if ("REJECTED".equalsIgnoreCase(task.getStatus())) {
            task.setRejectionReason(dto.getRejectionReason());
        } else {
            task.setRejectionReason(null);
        }

        return vendorTaskRepository.save(task);
    }
}