package com.example.rappa.repository;

import com.example.rappa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(value = "SELECT * FROM user WHERE username = :username",nativeQuery = true)
    User findByUsername(String username);

    @Query(value = "DELETE FROM user WHERE username = :username",nativeQuery = true)
    void deleteByUsername(String username);
}