package com.example.rappa.controller;

import com.example.rappa.model.WordTwoSyllable;
import com.example.rappa.service.WordTwoSyllableService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word2")
@CrossOrigin(origins = "http://localhost:5173")
public class WordTwoSyllableController {
    @Autowired
    private WordTwoSyllableService word2Service;

    //find all
    @GetMapping("/all")
    public List<WordTwoSyllable> findAll() {
        return word2Service.findAll();
    }

    //find word by word
    @GetMapping("/find/{word}")
    public List<WordTwoSyllable> findByWord(@PathVariable String word) {
        return word2Service.findByWord(word);
    }

    //find word with same rhyme, use url path to get input
    @GetMapping("/rhyme/{word}")
    public List<WordTwoSyllable> getWordsWithSameRhyme(@PathVariable String word) {
        return word2Service.getWordsWithSameRhyme(word);
    }
}
