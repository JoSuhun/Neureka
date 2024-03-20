//package com.ssafy.stocker.company.entity;
//
//import com.ssafy.stocker.user.entity.UserEntity;
//import jakarta.persistence.*;
//
//@Entity(name = "user_like_company")
//public class UserCompanyEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="ulc_id")
//    private Long id;
//
//    @ManyToOne
//    private CompanyEntity company;
//
//    @ManyToOne
//    private UserEntity user;
//}
