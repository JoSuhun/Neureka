package com.ssafy.stocker.company.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "company")
@Getter
@Setter
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "company_id")
    private Long companyId;

    @Column(name = "code")
    private String code;

    @Column(name = "company_name")
    private String companyName;


//    @OneToMany(mappedBy = "company")
//    private Set<UserCompanyEntity> userCompanyEntities = new HashSet<>();
}
