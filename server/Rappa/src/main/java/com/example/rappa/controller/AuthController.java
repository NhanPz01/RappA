package com.example.rappa.controller;

import com.example.rappa.dto.request.AuthRequest;
import com.example.rappa.dto.response.UserInfoResponse;
import com.example.rappa.model.User;
import com.example.rappa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://qcc354tc-5173.asse.devtunnels.ms/")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(userService.findRoleByName("ROLE_USER"));
        userService.save(user);
        return ResponseEntity.ok(UserInfoResponse.fromUser(user));  
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            User user = userService.findByUsername(authRequest.getUsername());
            return ResponseEntity.ok(UserInfoResponse.fromUser(user));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(403).body("Authentication failed");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/user")
    public ResponseEntity<?> userAccess() {
        return ResponseEntity.ok("User access granted");
    }
}