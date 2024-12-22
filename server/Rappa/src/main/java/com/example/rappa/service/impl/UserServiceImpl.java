package com.example.rappa.service.impl;

import com.example.rappa.model.Role;
import com.example.rappa.model.User;
import com.example.rappa.repository.RoleRepository;
import com.example.rappa.repository.UserRepository;
import com.example.rappa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public Role findRoleByName(String roleUser) {
        return roleRepository.findByName(roleUser);
    }
}