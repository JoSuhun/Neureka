package com.ssafy.stocker.user.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface ReissueService {


    ResponseEntity<?> reissueRefreshToken(HttpServletRequest request, HttpServletResponse response);
}
