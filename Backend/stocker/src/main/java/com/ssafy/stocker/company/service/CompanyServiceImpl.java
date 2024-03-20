package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CompanyServiceImpl implements  CompanyService {

    private final CompanyRepository companyRepository ;


    public CompanyServiceImpl(CompanyRepository companyRepository,RestTemplate restTemplate){
        this.companyRepository = companyRepository;

    }

    @Override
    public List<CompanyEntity> findCompanyList() {
        return companyRepository.findAll();
    }


    @Override
    public void addLikeCompany(String codeId, Integer code) {

    }
}
