package com.example.rappa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

        @GetMapping
        public ResponseEntity<String> userAccess() {
            return ResponseEntity.ok("User access granted");
        }

        @GetMapping("/records")
        public ResponseEntity<?> userRecords() {
            // Code to get all records own by user
            return null;
        }
}
