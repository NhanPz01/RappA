package com.example.rappa.dto.response;

import com.example.rappa.model.User;

public class UserInfoResponse {
    private String username;
    private String role;

    public UserInfoResponse(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public static UserInfoResponse fromUser(User user) {
        if (user != null) {
            return new UserInfoResponse(user.getUsername(), user.getRole().getName());
        }
        return null;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}
