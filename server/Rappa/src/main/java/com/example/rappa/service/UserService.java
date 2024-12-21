package com.example.rappa.service;

import com.example.rappa.model.Role;
import com.example.rappa.model.User;
import java.util.List;

public interface UserService {
    List<User> findAll();
    User findByUsername(String username);
    User save(User user);
    void deleteByUsername(String username);

    Role findRoleByName(String roleUser);
}