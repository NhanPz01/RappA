package com.example.rappa.controller;

import com.example.rappa.dto.request.AuthRequest;
import com.example.rappa.dto.request.RecordRequest;
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

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RecordService recordService;

    @GetMapping("/records")
    public ResponseEntity<?> userRecords(@RequestBody UserInfoResponse userInfoResponse) {
        User user = userService.findByUsername(userInfoResponse.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        List<?> records = recordService.findByUsername(user.getUsername());
        return ResponseEntity.ok(records);
    }

    @GetMapping("/record/{id}")
    public ResponseEntity<?> userRecord(@RequestBody UserInfoResponse userInfoResponse, @PathVariable Integer id) {
        User user = userService.findByUsername(userInfoResponse.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Record record = user.getRecords().stream().filter(rec -> rec.getId().equals(id)).findFirst().orElse(null);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        return ResponseEntity.ok(record.getContent());

    }

    @PostMapping("/record")
    public ResponseEntity<?> addRecord(@RequestBody RecordRequest recordRequest) {
        User user = userService.findByUsername(recordRequest.getUsername());
        if (Objects.isNull(user)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        Record record = new Record(recordRequest.getContent(), user);
        recordService.save(record);
        return ResponseEntity.ok(record.getContent());
    }

    @PutMapping("/record/{id}")
    public ResponseEntity<?> updateRecord(@RequestBody RecordRequest recordRequest, @PathVariable Integer id) {
        Record updatedRecord = recordService.findById(id);
        if (updatedRecord != null) {
            BeanUtils.copyProperties(recordRequest, updatedRecord);
            recordService.save(updatedRecord);
            return ResponseEntity.ok(updatedRecord.getContent());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
    }

    @DeleteMapping("/record/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Integer id) {
        Record record = recordService.findById(id);
        if (Objects.isNull(record)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found");
        }
        recordService.deleteById(id);
        return ResponseEntity.ok("Record deleted");
    }
}