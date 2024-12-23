package com.example.rappa.service.impl;

import com.example.rappa.dto.response.RecordResponse;
import com.example.rappa.dto.response.UserResponse;
import com.example.rappa.model.Record;
import com.example.rappa.model.User;
import com.example.rappa.service.AdminService;
import com.example.rappa.service.RecordService;
import com.example.rappa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserService userService;

    @Autowired
    private RecordService recordService;

    @Override
    public List<UserResponse> getUsers() {
        List<User> users = userService.findAll();
        return users.stream()
                .map(user -> new UserResponse(user.getUsername(), user.getRole(), user.getRecords()))
                .toList();
    }

    @Override
    public UserResponse getUser(String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return null;
        }
        return new UserResponse(user.getUsername(), user.getRole(), user.getRecords());
    }

    @Override
    public void deleteUser(String username) {
        // delete all records of the user first, then delete the user
        User user = userService.findByUsername(username);
        if (user != null) {
            recordService.deleteAllByUsername(user.getUsername());
            userService.deleteByUsername(user.getUsername());
        }
    }

    @Override
    public List<RecordResponse> getRecords() {
        List<Record> records = recordService.findAll();
        return records.stream()
                .map(record -> new RecordResponse(record.getId(),record.getTitle(), record.getContent(), record.getUser().getUsername()))
                .toList();
    }

    @Override
    public RecordResponse getRecord(Integer id) {
        Record record = recordService.findById(id);
        if (record == null) {
            return null;
        }
        return new RecordResponse(record.getId(),record.getTitle(), record.getContent(), record.getUser().getUsername());
    }

    @Override
    public void deleteRecord(Integer id) {
        recordService.deleteById(id);
    }
}
