package com.example.rappa.dto.response;

import com.example.rappa.model.Record;
import com.example.rappa.model.Role;
import com.example.rappa.model.User;

import java.util.List;

public class UserResponse {
    private String username;
    private String role;
    private List<RecordResponse> records;

    public UserResponse() {
    }

    public UserResponse(String username, Role role, List<Record> records) {
        this.username = username;
        this.role = role.getName();
        this.records = records.stream()
                .map(record -> new RecordResponse(record.getId(),record.getTitle(), record.getContent(), record.getUser().getUsername()))
                .toList();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<RecordResponse> getRecords() {
        return records;
    }

    public void setRecords(List<RecordResponse> records) {
        this.records = records;
    }
}
