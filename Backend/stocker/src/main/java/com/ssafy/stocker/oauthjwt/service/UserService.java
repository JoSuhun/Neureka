package com.ssafy.stocker.oauthjwt.service;

import com.ssafy.stocker.oauthjwt.dto.UserDTO;
import com.ssafy.stocker.oauthjwt.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserEntity findUser(String email);
}
