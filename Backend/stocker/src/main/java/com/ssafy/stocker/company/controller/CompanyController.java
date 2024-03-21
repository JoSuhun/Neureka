package com.ssafy.stocker.company.controller;


import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.company.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/v1/company" , produces = "application/json")
public class CompanyController {

    private final CompanyService companyService;
    private final WebClient webClient ;
    public CompanyController(CompanyService companyService, WebClient.Builder webClientBuilder){
        this.companyService = companyService;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build() ;
    }

    @Operation(summary = "주식 최근 10년간 가격을 조회합니다." )
    @GetMapping("/stock/price")
    public ResponseEntity<String> getDataFromDjango(@RequestParam String code) {
        String url = "/finance/fetch-krx/?code=" + code;

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return ResponseEntity.ok(response);
    }


    @Operation(summary = "주식 목록 리스트를 조회합니다." )
    @GetMapping("/list")
    public ResponseEntity<?> findList() {
        try {
            List<CompanyEntity> companyList = companyService.findCompanyList();
            return new ResponseEntity<List<CompanyEntity>>(companyList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "유저가 관심있는 회사를 추가합니다" )
    @PostMapping("/like")
    public ResponseEntity<?> addLikeCompany(@RequestParam String email , @RequestParam String code){
        try {
            log.info(email + " " + code);
            companyService.addLikeCompany(email , code);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }



    @Operation(summary = "유저가 관심있는 회사 리스트를 조회합니다.")
    @GetMapping("/like/list")
    public ResponseEntity<?> userLikeCompanyFind(String email){
        try {
             List<UserCompanyEntity> userCompanyList=  companyService.findUserLIkeCompany(email);

            return new ResponseEntity<List<UserCompanyEntity>>(userCompanyList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }


}
