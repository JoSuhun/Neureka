package com.ssafy.stocker.company.repository;

import com.ssafy.stocker.company.entity.CompanyReadEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyReadRepository extends JpaRepository<CompanyReadEntity,Long> {

    List<CompanyReadEntity> findByEmail(String email);

    Boolean existsByEmailAndCompanyCode(String email , String companyCode);
}
