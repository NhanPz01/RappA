package com.example.rappa.service;

import com.example.rappa.model.Record;
import java.util.List;

public interface RecordService {
    List<Record> findAll();
    Record findById(Integer id);
    List<Record> findByUsername(String username);
    Record save(Record record);
    void deleteById(Integer id);
<<<<<<< HEAD
    void deleteByUsername(String username);
=======
    void deleteAllByUsername(String username);
>>>>>>> fca3dcfb64d58b05c21c575e8b423c615abc0497
}