package com.ssafy.stocker.oauthjwt.service;

import com.ssafy.stocker.oauthjwt.dto.UserDTO;
import com.ssafy.stocker.oauthjwt.entity.UserEntity;
import com.ssafy.stocker.oauthjwt.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public UserEntity findUser(String email) {
        return userRepository.findByEmail(email);
    }
}
