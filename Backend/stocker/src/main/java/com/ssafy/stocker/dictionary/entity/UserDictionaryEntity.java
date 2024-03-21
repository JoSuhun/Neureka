package com.ssafy.stocker.dictionary.entity;

import com.ssafy.stocker.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user_like_dic")
@Getter
@Setter
public class UserDictionaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_dic_id")
    private Long userDicId;

    @ManyToOne
    @JoinColumn(name = "dic_id")
    private DictionaryEntity dictionary;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
