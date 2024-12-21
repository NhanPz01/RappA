package com.example.rappa.service;

import com.example.rappa.model.Record;
import java.util.List;

public interface RecordService {
    List<Record> findAll();
    Record findById(Integer id);
    Record save(Record record);
    void deleteById(Integer id);
}