package com.example.eventzen_execution_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class NodeIntegrationService {

    private final RestTemplate restTemplate;

    @Value("${node.service.base-url}")
    private String nodeBaseUrl;

    public NodeIntegrationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Double fetchEstimatedAmount(Long eventId, String bearerToken) {
        String url = nodeBaseUrl + "/bookings/" + eventId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map bookingWrapper = response.getBody();
        if (bookingWrapper == null || bookingWrapper.get("booking") == null) {
            throw new RuntimeException("Unable to fetch booking data from Node service");
        }

        Map booking = (Map) bookingWrapper.get("booking");
        Object estimatedBudget = booking.get("total_estimated_cost");

        if (estimatedBudget == null) {
            throw new RuntimeException("Estimated budget not found in booking data");
        }

        return Double.valueOf(String.valueOf(estimatedBudget));
    }
}