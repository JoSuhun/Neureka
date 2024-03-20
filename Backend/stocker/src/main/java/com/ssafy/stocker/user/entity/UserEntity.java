package com.ssafy.stocker.user.entity;

//import com.ssafy.stocker.company.entity.UserCompanyEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String name;

    private String email;

    private String role;



//    @OneToMany(mappedBy = "user")
//    private Set<UserCompanyEntity> userCompanyEntities = new HashSet<>();
}
