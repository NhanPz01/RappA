package com.example.rappa.service;

import com.example.rappa.model.WordTwoSyllable;

import java.util.List;

public interface WordTwoSyllableService {
    List<WordTwoSyllable> findAll();

    List<WordTwoSyllable> findByWord(String word);

    List<WordTwoSyllable> getWordsWithSameRhyme(String word);
}
