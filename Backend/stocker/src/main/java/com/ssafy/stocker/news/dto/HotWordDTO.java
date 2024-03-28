package com.ssafy.stocker.news.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Data
@Getter
@Setter
public class HotWordDTO {

    public HotWordDTO(String word, Long count) {
        this.word = word;
        this.count = count;
    }


    private String word;

    private Long count;


}
