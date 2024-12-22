package com.example.rappa.controller;

import com.example.rappa.dto.response.RecordResponse;
import com.example.rappa.dto.response.UserInfoResponse;
import com.example.rappa.dto.response.UserResponse;
import com.example.rappa.model.Record;
import com.example.rappa.model.User;
import com.example.rappa.service.AdminService;
import com.example.rappa.service.RecordService;
import com.example.rappa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5174")
public class AdminController {
    @Autowired
    private AdminService adminService;

    // API for users
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        List<UserResponse> users = adminService.getUsers();
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found");
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        UserResponse user = adminService.getUser(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        adminService.deleteUser(username);
        return ResponseEntity.ok("User deleted successfully");
    }

    // API for records
    @GetMapping("/records")
    public ResponseEntity<?> getRecords() {
        List<RecordResponse> records = adminService.getRecords();
        if (records.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No records found");
        }
        return ResponseEntity.ok(records);
    }

    @GetMapping("/record/{id}")
    public ResponseEntity<?> getRecord(@PathVariable Integer id) {
        RecordResponse record = adminService.getRecord(id);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        return ResponseEntity.ok(record);
    }

    @DeleteMapping("/record/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Integer id) {
        adminService.deleteRecord(id);
        return ResponseEntity.ok("Record deleted successfully");
    }
}