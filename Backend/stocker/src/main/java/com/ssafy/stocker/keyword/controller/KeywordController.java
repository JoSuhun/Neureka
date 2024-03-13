package com.ssafy.stocker.keyword.controller;

import com.ssafy.stocker.keyword.service.KeywordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class KeywordController {

    private final KeywordService keywordService ;

    public KeywordController(KeywordService keywordService){
        this.keywordService = keywordService;
    }



    @GetMapping
    @Operation(summary = "메인화면에 띄울 키워드들을 조회합니다" )
    public ResponseEntity<?> keywordList(){
        try {
            List<String> keywords =  keywordService.findKeyword();
            return new ResponseEntity<>(keywords, HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
