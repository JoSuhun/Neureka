package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.dto.HotWordDTO;
import com.ssafy.stocker.news.entity.SearchedWordEntity;
import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import com.ssafy.stocker.news.repository.RecommendedArticleDetailRepository;
import com.ssafy.stocker.news.repository.SearchedWordRepository;
import com.ssafy.stocker.news.repository.UserVIewedArticleRepository;
import com.ssafy.stocker.user.service.RedisService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    private final UserVIewedArticleRepository userVIewedArticleRepository;
    private final RecommendedArticleDetailRepository recommendedArticleDetailRepository;
    private final RedisService redisService;
    private final SearchedWordRepository searchedWordRepository;

    public NewsServiceImpl(UserVIewedArticleRepository userVIewedArticleRepository, RecommendedArticleDetailRepository recommendedArticleDetailRepository, RedisService redisService, SearchedWordRepository searchedWordRepository) {
        this.userVIewedArticleRepository = userVIewedArticleRepository;
        this.recommendedArticleDetailRepository = recommendedArticleDetailRepository;
        this.redisService = redisService;
        this.searchedWordRepository = searchedWordRepository;
    }

    @Override
    public void saveUserViewedArticle(String email, String newsUrl) {
        redisService.setValuesToList(email,newsUrl, (long) (7 * 24 * 60 * 60 * 1000));
    }

    @Override
    public Object getRedisListValue(String key) {
        return redisService.getValuesToList(key);
    }

    @Override
    public void addSearchWord(SearchedWordEntity searchedWord) {

        searchedWordRepository.save(searchedWord);
    }

    @Override
    public List<HotWordDTO> findHotWord() {
        return  searchedWordRepository.countHotWord() ;
    }

    // 개수 받는거 설정 상위 10개

}
