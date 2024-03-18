package com.ssafy.stocker.dictionary.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "dictionary")
@Getter
@Setter
@ToString
public class DictionaryEntity {

    @Column(name = "dic_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private  String content;
    private String title;

}
