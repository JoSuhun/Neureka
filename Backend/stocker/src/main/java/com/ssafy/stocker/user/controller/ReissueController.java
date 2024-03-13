package com.ssafy.stocker.user.controller;

import com.ssafy.stocker.user.jwt.JWTUtil;
import com.ssafy.stocker.user.service.ReissueService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class ReissueController {


    private final ReissueService reissueService;

    public ReissueController( ReissueService reissueService) {


        this.reissueService = reissueService;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        return reissueService.reissueRefreshToken(request, response);

    }
}