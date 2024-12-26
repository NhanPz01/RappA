package com.example.rappa.service.impl;

import com.example.rappa.model.Word;
import com.example.rappa.repository.WordRepository;
import com.example.rappa.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordServiceImpl implements WordService {
    @Autowired
    private WordRepository wordRepository;

    @Override
    public List<Word> findAll() {
        return wordRepository.findAll();
    }

    @Override
    public List<Word> findByWord(String word) {
        return wordRepository.findByWord(word);
    }

    @Override
    public List<Word> getWordsWithSameRhyme(String word) {
        // Make logic to find words with the same rhyme
        //danh sách phụ âm
        String[] consonants = {"ngh","nh","ng","gh","kh","ph","ch","b","c","d","đ","g","h","k","l","m","n","p","q","r","s","t","th","tr","v","x"};
        // loại bỏ phụ âm ở đầu
        for (String consonant : consonants) {
            if (word.startsWith(consonant)) {
                word = word.substring(consonant.length());
                break;
            }
        }
        // nếu trong từ có chữ "y" thì chuyển thành "i"
        word = word.replace("y", "i");
        return wordRepository.findAllByNoAccentEndingWith(word);
    }

}
