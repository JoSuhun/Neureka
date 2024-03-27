package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NewsService {

    public void saveUserViewedArticle(String email, String newsUrl);

    public Object getRedisListValue(String key);
}
