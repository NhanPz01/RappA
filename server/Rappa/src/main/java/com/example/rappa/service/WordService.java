package com.example.rappa.service;

import com.example.rappa.model.Word;

import java.util.List;

public interface WordService {
    List<Word> findAll();
    List<Word> findByWord(String word);
    List<Word> getWordsWithSameRhyme(String word);
}
