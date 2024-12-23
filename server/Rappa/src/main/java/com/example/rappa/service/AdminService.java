package com.example.rappa.service;

import com.example.rappa.dto.response.RecordResponse;
import com.example.rappa.dto.response.UserResponse;

import java.util.List;

public interface AdminService {
    List<UserResponse> getUsers();
    UserResponse getUser(String username);
    void deleteUser(String username);
    List<RecordResponse> getRecords();
    RecordResponse getRecord(Integer id);
    void deleteRecord(Integer id);
}
