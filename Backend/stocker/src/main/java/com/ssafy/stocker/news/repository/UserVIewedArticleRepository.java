package com.ssafy.stocker.news.repository;

import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVIewedArticleRepository extends JpaRepository<UserViewedArticleEntity, Long> {

}
