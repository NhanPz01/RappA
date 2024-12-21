package com.example.rappa.model;

import jakarta.persistence.*;

@Entity
@Table(name = "word2")
public class WordTwoSyllable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "word")
    private String word;

    @Column(name = "no_accent")
    private String noAccent;

    public WordTwoSyllable() {
    }

    public WordTwoSyllable(Integer id, String word, String noAccent) {
        this.id = id;
        this.word = word;
        this.noAccent = noAccent;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getNoAccent() {
        return noAccent;
    }

    public void setNoAccent(String noAccent) {
        this.noAccent = noAccent;
    }
}
