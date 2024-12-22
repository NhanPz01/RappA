package com.example.rappa.repository;

import com.example.rappa.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {
    @Query(value = "SELECT record.id, record.title, record.content, record.username FROM record JOIN user ON record.username=user.username WHERE record.username = :username",nativeQuery = true)
    List<Record> findByUsername(@Param("username") String username);

    @Query(value = "DELETE FROM record WHERE username = :username",nativeQuery = true)
    void deleteByUsername(@Param("username") String username);
}