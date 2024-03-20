package com.ssafy.stocker.company.entity;


import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "company")
@Getter
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "company_id")
    private Long companyId;

    private Integer code;

    @Column(name = "company_name")
    private String companyName;


//    @OneToMany(mappedBy = "company")
//    private Set<UserCompanyEntity> userCompanyEntities = new HashSet<>();
}
