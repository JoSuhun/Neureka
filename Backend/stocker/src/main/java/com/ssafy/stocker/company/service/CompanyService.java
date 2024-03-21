package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;

import java.util.List;

public interface CompanyService {
    List<CompanyEntity> findCompanyList();



    void addLikeCompany(String email, Integer companyId);

    List<UserCompanyEntity> findUserLIkeCompany(String email);
}
