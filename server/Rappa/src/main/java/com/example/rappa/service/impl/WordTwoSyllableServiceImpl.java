package com.example.rappa.service.impl;

import com.example.rappa.model.WordTwoSyllable;
import com.example.rappa.repository.WordTwoSyllableRepository;
import com.example.rappa.service.WordTwoSyllableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordTwoSyllableServiceImpl implements WordTwoSyllableService {
    @Autowired
    private WordTwoSyllableRepository wordTwoSyllableRepository;

    @Override
    public List<WordTwoSyllable> findAll() {
        return wordTwoSyllableRepository.findAll();
    }

    @Override
    public List<WordTwoSyllable> findByWord(String word) {
        return wordTwoSyllableRepository.findByWord(word);
    }

    @Override
    public List<WordTwoSyllable> getWordsWithSameRhyme(String word) {
        String firstSyllable = word.substring(0, word.indexOf(" "));
        String secondSyllable = word.substring(word.indexOf(" ") + 1);
        String[] consonants = {"ngh", "nh", "ng", "gh", "kh", "ph", "ch", "b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "th", "tr", "v", "x"};
        for (String consonant : consonants) {
            if (firstSyllable.startsWith(consonant)) {
                firstSyllable = firstSyllable.substring(consonant.length());
                break;
            }
        }
        for (String consonant : consonants) {
            if (secondSyllable.startsWith(consonant)) {
                secondSyllable = secondSyllable.substring(consonant.length());
                break;
            }
        }
        firstSyllable = firstSyllable.replace("y", "i");
        secondSyllable = secondSyllable.replace("y", "i");
        word = "%" + firstSyllable + " %" + secondSyllable;
        String exceptedWord1 = "%u" + firstSyllable + " %" + secondSyllable;
        String exceptedWord2 = "%o" + firstSyllable + " %" + secondSyllable;
        String exceptedWord3 = "%i" + firstSyllable + " %" + secondSyllable;
        return wordTwoSyllableRepository.getWordsWithSameRhyme(word, exceptedWord1, exceptedWord2, exceptedWord3);
    }
}
