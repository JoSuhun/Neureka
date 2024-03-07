package com.ssafy.stocker.oauthjwt.controller;

import com.ssafy.stocker.oauthjwt.dto.UserDTO;
import com.ssafy.stocker.oauthjwt.entity.UserEntity;
import com.ssafy.stocker.oauthjwt.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping(value = "/api/v1/user", produces = "application/json")
@Tag(name = "User", description = "User API")
public class UserController {

    private final UserService userService;



    public UserController(UserService userService){
        this.userService = userService;
    }



    @GetMapping("/mypage")
    @Operation(summary = "회원정보를 조회합니다" )
    public ResponseEntity<?> userDetails(@RequestParam @Parameter String email){
        try {
            log.info("user/mypage 시작 param email : " + email );
            UserEntity userEntity;
            userEntity = userService.findUser(email);

            if(userEntity != null){
                return new ResponseEntity<UserEntity>(userEntity, HttpStatus.OK);
            }else {
                log.info("회원 정보 조회 실패");
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST) ;
            }

        }catch (Exception e){
            e.printStackTrace();

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST) ;
        }

    }


}
