package com.example.rappa.controller;

import com.example.rappa.model.Word;
import com.example.rappa.service.WordService;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/word")
@CrossOrigin(origins = "http://localhost:5174") // Allow requests from this origin
public class WordController {
    @Autowired
    private WordService wordService;

    //find all
    @GetMapping("/all")
    public List<Word> findAll() {
        return wordService.findAll();
    }

    //find word by word
    @GetMapping("/find/{word}")
    public List<Word> findByWord(@PathVariable String word) {
        return wordService.findByWord(word);
    }

    //find word with same rhyme, use url path to get input
    @GetMapping("/rhyme/{word}")
    public List<Word> getWordsWithSameRhyme(@PathVariable String word) {
        return wordService.getWordsWithSameRhyme(word);
    }
}