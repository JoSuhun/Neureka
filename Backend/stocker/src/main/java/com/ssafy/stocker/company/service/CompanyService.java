package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.CompanyEntity;

import java.util.List;

public interface CompanyService {
    List<CompanyEntity> findCompanyList();



    void addLikeCompany(String userId, Integer companyId);
}
