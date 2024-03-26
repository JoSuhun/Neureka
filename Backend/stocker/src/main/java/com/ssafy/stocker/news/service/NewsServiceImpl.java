package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import org.springframework.stereotype.Service;

@Service
public class NewsServiceImpl implements NewsService {

    private UserViewedArticleEntity userViewedArticleEntity;

    public NewsServiceImpl(UserViewedArticleEntity userViewedArticleEntity) {
        this.userViewedArticleEntity = userViewedArticleEntity;
    }
}
