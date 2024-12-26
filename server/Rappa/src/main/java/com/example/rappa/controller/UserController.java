package com.example.rappa.controller;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import com.example.rappa.dto.request.AuthRequest;
import com.example.rappa.dto.request.RecordRequest;
import com.example.rappa.dto.response.RecordResponse;
import com.example.rappa.dto.response.UserInfoResponse;
import com.example.rappa.model.Record;
import com.example.rappa.model.User;
import com.example.rappa.service.RecordService;
import com.example.rappa.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.rappa.model.Word;
import com.example.rappa.service.WordService;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://qcc354tc-5173.asse.devtunnels.ms/")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RecordService recordService;

    @PostMapping("/records")
    public ResponseEntity<?> userRecords(@RequestBody UserInfoResponse userInfoResponse) {
        User user = userService.findByUsername(userInfoResponse.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        List<Record> records = recordService.findByUsername(user.getUsername());
        if (records.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No records found");
        }
        List<RecordResponse> recordResponses = records.stream()
                .map(record -> new RecordResponse(record.getId(), record.getTitle(), record.getContent(),
                        record.getUser().getUsername()))
                .toList();
        return ResponseEntity.ok(recordResponses);
    }

    @PostMapping("/record/{id}")
    public ResponseEntity<?> userRecord(@RequestBody UserInfoResponse userInfoResponse, @PathVariable Integer id) {
        User user = userService.findByUsername(userInfoResponse.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Record record = user.getRecords().stream().filter(rec -> rec.getId().equals(id)).findFirst().orElse(null);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        return ResponseEntity
                .ok(new RecordResponse(record.getId(), record.getTitle(), record.getContent(),
                        record.getUser().getUsername()));
    }

    @PostMapping("/record")
    public ResponseEntity<?> addRecord(@RequestBody RecordRequest recordRequest) {
        User user = userService.findByUsername(recordRequest.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        String title = recordRequest.getTitle().isEmpty() ? "Record" : recordRequest.getTitle();
        Record record = new Record(title, recordRequest.getContent(), user);
        recordService.save(record);
        return ResponseEntity.status(HttpStatus.CREATED).body("Record created successfully");
    }

    @PutMapping("/record/{id}")
    public ResponseEntity<?> updateRecord(@RequestBody RecordRequest recordRequest, @PathVariable Integer id) {
        Record updatedRecord = recordService.findById(id);
        if (Objects.isNull(updatedRecord)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        BeanUtils.copyProperties(recordRequest, updatedRecord);
        recordService.save(updatedRecord);
        return ResponseEntity.ok("Record updated successfully");
    }

    @DeleteMapping("/record/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Integer id) {
        Record record = recordService.findById(id);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        recordService.deleteById(id);
        return ResponseEntity.ok("Record deleted successfully");
    }

}