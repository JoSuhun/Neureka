package com.ssafy.stocker.user.service;

import com.ssafy.stocker.user.entity.UserEntity;
import com.ssafy.stocker.user.repository.UserRepository;
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
