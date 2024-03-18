package com.ssafy.stocker.company.controller;


import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/v1/company" , produces = "application/json")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService){
        this.companyService = companyService;
    }


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

    @PostMapping("like")
    public ResponseEntity<?> addLikeCompany(@RequestParam String userId , @RequestParam Integer code){
        try {

        } catch (Exception e){

        }

        return null;
    }

//    @GetMapping("/stock/price")
//    public ResponseEntity<?> findStockPrice(@RequestParam String code){
//        try {
//             String[] stockPrice = companyService.companyStockPrice(code);
//
//            return new ResponseEntity<CompanyEntity>(company , HttpStatus.OK);
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
//        }
//    }
}
