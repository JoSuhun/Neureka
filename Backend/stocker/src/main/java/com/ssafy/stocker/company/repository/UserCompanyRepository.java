package com.ssafy.stocker.company.repository;

import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCompanyRepository  extends  JpaRepository<UserCompanyEntity, Long>{

    List<UserCompanyEntity> findByUser(UserEntity User);
}
