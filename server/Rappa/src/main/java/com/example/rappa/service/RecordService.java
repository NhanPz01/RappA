package com.example.rappa.service;

import com.example.rappa.model.Record;
import java.util.List;

public interface RecordService {
    List<Record> findAll();
    Record findById(Integer id);
    List<Record> findByUsername(String username);
    Record save(Record record);
    void deleteById(Integer id);
    void deleteAllByUsername(String username);
}