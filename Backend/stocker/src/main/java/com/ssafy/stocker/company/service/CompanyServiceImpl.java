package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CompanyServiceImpl implements  CompanyService {

    private final CompanyRepository companyRepository ;
    private final RestTemplate restTemplate;

    public CompanyServiceImpl(CompanyRepository companyRepository,RestTemplate restTemplate){
        this.companyRepository = companyRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public List<CompanyEntity> findCompanyList() {
        return companyRepository.findAll();
    }



    @Override
    public String[] companyStockPrice(String code) {
        String djangoUrl = "http://localhost/data?" + code ;
        String[] jsonResponse = restTemplate.getForObject(djangoUrl , String[].class);
        return jsonResponse;
    }
}
