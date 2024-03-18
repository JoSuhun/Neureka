package com.ssafy.stocker.dictionary.service;

import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.repository.DictinaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryServiceImpl implements DictionaryService{

    private final DictinaryRepository dictinaryRepository;

    public DictionaryServiceImpl(DictinaryRepository dictinaryRepository){
        this.dictinaryRepository = dictinaryRepository;
    }
    @Override
    public List<DictionaryEntity> findDictionaryList() {

        List<DictionaryEntity> dictionaryList = dictinaryRepository.findAll();

        return dictionaryList;
    }

    @Override
    public DictionaryEntity findDictionary(String title) {
        DictionaryEntity dictionary = dictinaryRepository.findByTitle(title);
        return dictionary;
    }
}
