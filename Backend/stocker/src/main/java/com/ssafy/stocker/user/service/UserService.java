package com.ssafy.stocker.user.service;

import com.ssafy.stocker.user.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserEntity findUser(String email);
}
