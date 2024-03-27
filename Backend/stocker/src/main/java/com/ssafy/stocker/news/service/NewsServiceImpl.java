package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import com.ssafy.stocker.news.repository.RecommendedArticleDetailRepository;
import com.ssafy.stocker.news.repository.UserVIewedArticleRepository;
import com.ssafy.stocker.user.service.RedisService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    private final UserVIewedArticleRepository userVIewedArticleRepository;
    private final RecommendedArticleDetailRepository recommendedArticleDetailRepository;
    private final RedisService redisService;

    public NewsServiceImpl(UserVIewedArticleRepository userVIewedArticleRepository, RecommendedArticleDetailRepository recommendedArticleDetailRepository, RedisService redisService) {
        this.userVIewedArticleRepository = userVIewedArticleRepository;
        this.recommendedArticleDetailRepository = recommendedArticleDetailRepository;
        this.redisService = redisService;
    }

    @Override
    public void saveUserViewedArticle(String email, String newsUrl) {
        redisService.setValuesToList(email,newsUrl, (long) (7 * 24 * 60 * 60 * 1000));
    }

    @Override
    public Object getRedisListValue(String key) {
        return redisService.getValuesToList(key);
    }
}
