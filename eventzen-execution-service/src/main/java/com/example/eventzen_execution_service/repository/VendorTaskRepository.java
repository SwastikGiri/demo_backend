package com.example.eventzen_execution_service.repository;

import com.example.eventzen_execution_service.entity.VendorTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendorTaskRepository extends JpaRepository<VendorTask, Long> {

    List<VendorTask> findByEventId(Long eventId);

    List<VendorTask> findByVendorId(Long vendorId);
}