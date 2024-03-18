package com.ssafy.stocker.dictionary.repository;

import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DictinaryRepository extends JpaRepository<DictionaryEntity, Long> {


    DictionaryEntity findByTitle(String title);
}
