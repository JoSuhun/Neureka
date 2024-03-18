package com.ssafy.stocker.company.entity;


import jakarta.persistence.*;
import lombok.Getter;

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
}
