package com.example.rappa.controller;

import com.example.rappa.model.Word;
import com.example.rappa.service.WordService;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@RequestMapping("/word")
@CrossOrigin(origins = "https://qcc354tc-5173.asse.devtunnels.ms/") // Allow requests from this origin
public class WordController {
    @Autowired
    private WordService wordService;

    //find all
    @GetMapping("/all")
    public List<Word> findAll() {
        return wordService.findAll();
    }

    @PostMapping("/predict-word")
    public ResponseEntity<?> predictWord(@RequestBody String word) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python", "server/AI/loader.py", word);
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String result = reader.readLine();
            boolean prediction = Boolean.parseBoolean(result);
            return ResponseEntity.ok(prediction);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error predicting word");
        }
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