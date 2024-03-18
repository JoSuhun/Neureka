package com.ssafy.stocker.dictionary.service;


import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;

import java.util.List;

public interface DictionaryService {
    List<DictionaryEntity> findDictionaryList();


    DictionaryEntity findDictionary(String title);
}