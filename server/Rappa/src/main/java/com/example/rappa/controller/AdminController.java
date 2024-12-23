package com.example.rappa.controller;

<<<<<<< HEAD
import com.example.rappa.model.Record;
import com.example.rappa.model.User;
=======
import com.example.rappa.dto.response.RecordResponse;
import com.example.rappa.dto.response.UserInfoResponse;
import com.example.rappa.dto.response.UserResponse;
import com.example.rappa.model.Record;
import com.example.rappa.model.User;
import com.example.rappa.service.AdminService;
>>>>>>> fca3dcfb64d58b05c21c575e8b423c615abc0497
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
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    @Autowired
<<<<<<< HEAD
    private UserService userService;

    @Autowired
    private RecordService recordService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> adminAccess() {
        return ResponseEntity.ok("Admin access granted");
=======
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
>>>>>>> fca3dcfb64d58b05c21c575e8b423c615abc0497
    }

    // API for users

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        List<?> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        // delete all records of the user first, and then delete the user
        User user = userService.findByUsername(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        recordService.deleteByUsername(user.getUsername());
        userService.deleteByUsername(user.getUsername());
        return ResponseEntity.ok("User deleted");
    }

    // API for records

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/records")
    public ResponseEntity<?> getRecords() {
        List<?> records = recordService.findAll();
        return ResponseEntity.ok(records);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/record/{id}")
    public ResponseEntity<?> getRecord(@PathVariable Integer id) {
        Record record = recordService.findById(id);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        return ResponseEntity.ok(record);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/record/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Integer id) {
        Record record = recordService.findById(id);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        recordService.deleteById(record.getId());
        return ResponseEntity.ok("Record deleted");
    }

    // API for user records

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{username}/records")
    public ResponseEntity<?> getUserRecords(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        List<?> records = recordService.findByUsername(user.getUsername());
        return ResponseEntity.ok(records);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{username}/record/{id}")
    public ResponseEntity<?> getUserRecord(@PathVariable String username, @PathVariable Integer id) {
        User user = userService.findByUsername(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Record record = user.getRecords().stream().filter(rec -> rec.getId().equals(id)).findFirst().orElse(null);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        return ResponseEntity.ok(record);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{username}/record/{id}")
    public ResponseEntity<?> deleteUserRecord(@PathVariable String username, @PathVariable Integer id) {
        User user = userService.findByUsername(username);
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Record record = user.getRecords().stream().filter(rec -> rec.getId().equals(id)).findFirst().orElse(null);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        recordService.deleteById(record.getId());
        return ResponseEntity.ok("Record deleted");
    }
}