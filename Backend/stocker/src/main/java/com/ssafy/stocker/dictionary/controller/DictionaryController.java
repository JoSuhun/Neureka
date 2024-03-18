package com.ssafy.stocker.dictionary.controller;


import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.service.DictionaryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/v1/dictionary", produces = "application/json")
public class DictionaryController {

    private final DictionaryService dictinaryService;


    public DictionaryController(DictionaryService dictinaryService) {
        this.dictinaryService = dictinaryService;
    }

    @Operation(summary = "용어사전 리스트를 조회합니다" )
    @GetMapping("/get/list")
    public ResponseEntity<?> findList(){
        try {
            List<DictionaryEntity> dictionaryList = dictinaryService.findDictionaryList();
            return new ResponseEntity<List<DictionaryEntity>>(dictionaryList, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get")
    @Operation(summary = "경제 용어 상세 항목을 조회합니다" )
    public ResponseEntity<?> find(@RequestParam String title){
        try {
            DictionaryEntity dictionary = dictinaryService.findDictionary(title);
            return new ResponseEntity<DictionaryEntity>(dictionary, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

}
