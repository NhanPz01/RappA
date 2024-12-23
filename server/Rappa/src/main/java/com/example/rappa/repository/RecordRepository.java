package com.example.rappa.repository;

import com.example.rappa.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {
<<<<<<< HEAD
    @Query(value = "SELECT id, content FROM record JOIN user ON record.username=user.username WHERE record.username = :username",nativeQuery = true)
    List<?> findByUsername(@Param("username") String username);
=======
    @Query(value = "SELECT record.id, record.title, record.content, record.username FROM record JOIN user ON record.username=user.username WHERE record.username = :username",nativeQuery = true)
    List<Record> findByUsername(@Param("username") String username);
>>>>>>> fca3dcfb64d58b05c21c575e8b423c615abc0497

    @Query(value = "DELETE FROM record WHERE username = :username",nativeQuery = true)
    void deleteByUsername(@Param("username") String username);
}