package com.example.rappa.repository;

import com.example.rappa.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {
    // find by word of word
    List<Word> findByWord(String word);
    Word findByNoAccent(String noAccent);
    //findAllByNoAccentStartingWith
    List<Word> findAllByNoAccentStartingWith(String noAccent);
    List<Word> findAllByNoAccentEndingWith(String word);
}
