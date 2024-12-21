package com.example.rappa.repository;

import com.example.rappa.model.WordTwoSyllable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WordTwoSyllableRepository extends JpaRepository<WordTwoSyllable, Integer> {
    List<WordTwoSyllable> findByWord(String word);

    @Query(value = "SELECT * FROM word2 WHERE word2.no_accent LIKE :word AND word2.no_accent NOT LIKE :exceptedWord1 AND word2.no_accent NOT LIKE :exceptedWord2 AND word2.no_accent NOT LIKE :exceptedWord3", nativeQuery = true)
    List<WordTwoSyllable> getWordsWithSameRhyme(String word, String exceptedWord1, String exceptedWord2, String exceptedWord3);
}
