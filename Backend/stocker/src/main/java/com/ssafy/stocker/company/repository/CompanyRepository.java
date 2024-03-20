package com.ssafy.stocker.company.repository;

import com.ssafy.stocker.company.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity , Long> {
}
