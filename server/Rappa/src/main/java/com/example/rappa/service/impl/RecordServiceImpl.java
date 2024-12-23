package com.example.rappa.service.impl;

import com.example.rappa.model.Record;
import com.example.rappa.repository.RecordRepository;
import com.example.rappa.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {
    @Autowired
    private RecordRepository recordRepository;

    @Override
    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    @Override
    public Record findById(Integer id) {
        return recordRepository.findById(id).orElse(null);
    }

    @Override
    public List<Record> findByUsername(String username) {
        return recordRepository.findByUsername(username);
    }

    @Override
    public Record save(Record record) {
        return recordRepository.save(record);
    }

    @Override
    public void deleteById(Integer id) {
        recordRepository.deleteById(id);
    }

    @Override
    public void deleteAllByUsername(String username) {
        recordRepository.deleteByUsername(username);
    }
}