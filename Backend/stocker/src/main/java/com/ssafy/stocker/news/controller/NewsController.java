package com.ssafy.stocker.news.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stocker.news.dto.HotWordDTO;
import com.ssafy.stocker.news.entity.SearchedWordEntity;
import com.ssafy.stocker.news.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/news", produces = "application/json")
@Tag(name = "News", description = "NewsAPI")
public class NewsController {


    private final NewsService newsService;
    private final WebClient webClient ;

    public NewsController(NewsService newsService, WebClient.Builder webClientBuilder) {

        this.newsService = newsService;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build() ;
    }

    @PostMapping("/search/word")
    @Operation(summary =  "뉴스 키워드 검색 db저장 ")
    public ResponseEntity<?> searchWordAdd(@RequestBody SearchedWordEntity searchedWord){
        try {

            newsService.addSearchWord(searchedWord);
            return null;
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/hot/word")
    @Operation(summary = "인기검색어를 불러옵니다")
    public ResponseEntity<?> hotWordList(){
        try {
            List<HotWordDTO> hotWordList = newsService.findHotWord();
            return new ResponseEntity<List<HotWordDTO>>( hotWordList, HttpStatus.OK);
        }catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping()
    @Operation(summary = "기사 전체조회")
    public ResponseEntity<?> getAllArticle(){
        String url = "/data/news/api/today/";

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 응답 처리
//        log.info("Response from Django server: " + response);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/newsdetail")
    @Operation(summary = "기사 상세조회. newsId 는 news의 url입니다.")
    public ResponseEntity<?> getArticleDetail(@RequestParam(required = false) String email,
                                              @RequestParam String newsId){
        String url = "/data/news/api/news_details/";

        Map<String, String> requestData = new HashMap<>();
        requestData.put("_id", newsId);

        // 요청 본문에 JSON 형식으로 데이터를 추가하여 요청 보내기
        String response = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(requestData))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 응답 처리
//        log.info("Response from Django server: " + response);

        // 사용자가 열람한 기사이므로 이를 redis에 반영
        if(email != null){
            newsService.saveUserViewedArticle(email, newsId);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/keyword")
    @Operation(summary = "메인페이지 - 맞춤형 뉴스 추천" )
    public ResponseEntity<?> viewKeyword(@RequestBody Map<String, String[]> keyword){
        String url = "/data/news/api/keyword_article/";


        // 요청 본문에 JSON 형식으로 데이터를 추가하여 요청 보내기
        String response = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(keyword))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/grade")
    @Operation(summary = "해당 뉴스의 평가를 DB에 저장")
    public ResponseEntity<?> saveNewsRating(
//                                            @RequestParam(value = "사용자 이메일") String email,
                                            @RequestParam String newsId,
                                            @RequestParam String grade){
        String url = "/data/news/api/update_rate/";


        Map<String, Object> jsonData = new HashMap<>();
        jsonData.put("_id", newsId);
        jsonData.put("rating", grade);

        // 요청 본문에 JSON 형식으로 데이터를 추가하여 요청 보내기
        String response = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(jsonData))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/other/")
    @Operation(summary = "해당 뉴스와 유사한 내용의 뉴스를 3개 추천")
    public ResponseEntity<?> recommThreeNews(@RequestParam(required = false) String email,
                                             @RequestParam String newsId){
        String url = "/data/news/api/recommend/";

        Map<String, String> reqData = new HashMap<>();
        reqData.put("_id", newsId);

        // 요청 본문에 JSON 형식으로 데이터를 추가하여 요청 보내기
        String response = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(reqData)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        ObjectMapper objectMapper = new ObjectMapper();
        List<String> jsonList = null;
        try {
            jsonList = Arrays.asList(objectMapper.readValue(response, String[].class));
        } catch (Exception e) {
            e.printStackTrace();
        }

        Object tmpObj = null;

        if(email != null){
            tmpObj = newsService.getRedisListValue(email);
        }
        List<String> viewedArticle = new ArrayList<>();


        if(tmpObj != "false" && tmpObj != null){
            viewedArticle = (List<String>) tmpObj;
        }

        List<String> resultList = new ArrayList<>();

        for (String item : jsonList) {
            if (!viewedArticle.contains(item)) {
                resultList.add(item);
                if(resultList.size() == 3) break;
            }
        }

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @GetMapping("/hot")
    @Operation(summary = "실시간 조회수 높은 기사 5개 조회" )
    public ResponseEntity<?> hotNews(){
        String url = "/data/news/api/headlines/";

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
