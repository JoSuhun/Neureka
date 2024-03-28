package com.ssafy.stocker.company.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.company.repository.UserCompanyRepository;
import com.ssafy.stocker.company.service.SendMailService;
import com.ssafy.stocker.user.entity.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SendMailServiceImpl implements SendMailService {

    private final UserCompanyRepository userCompanyRepository;
    private final JavaMailSender javaMailSender;
    private final WebClient webClient ;
    public SendMailServiceImpl(UserCompanyRepository userCompanyRepository, JavaMailSender javaMailSender, WebClient.Builder webClientBuilder){
        this.userCompanyRepository = userCompanyRepository;
        this.javaMailSender = javaMailSender;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build() ;
    }

    @Override
    public void sendMail() {
        // 유저 찾기
        List<UserCompanyEntity> userCompanylist = userCompanyRepository.findByIsSendmail(true);

        // log 위한 변수
        int sendCount = 0 ;

        for(UserCompanyEntity userCompany : userCompanylist){
            log.info(userCompany.getUser().getEmail() + "에게" + userCompany.getCompany().getCompanyName() + "의 정보를 보냅니다" ) ;

            // 각 유저에게 메일 전송
            Boolean isSendCheck = sendUser(userCompany);

            //메일 전송 완료라면
            if(isSendCheck){
                log.info(userCompany.getUser().getEmail() + "에게 메일 전송 완료" );
                sendCount ++;
            }

        }

        log.info(sendCount + " 건 메일 전송 완료");

        // }
    }


    @Override
    public boolean sendUser(UserCompanyEntity userCompany) {
        //user 정보
        UserEntity user = userCompany.getUser();

        //company 정보
        CompanyEntity company = userCompany.getCompany();

        String companyName = company.getCompanyName();


        //구독한 기업에 해당하는 뉴스 id 5개를 불러 옵니다
        List<String> newsIds = getSubscribeNews(companyName);

        log.info("sendUser 메서드 newsIds : " + newsIds.toString());



        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("뉴레카 " + company.getCompanyName()  +"에 대한 요약메시지");


        String mainMessage = "";

        for(int i = 1 ; i < newsIds.size()+1 ; i ++ ){
            String summaryNews = getSummaryNews(newsIds.get(i)) ;
            log.info("요약뉴스 결과 summaryNews: " + summaryNews);
            mainMessage = mainMessage  + i + "번째 뉴스 " + summaryNews  + "\n";
        }
        simpleMailMessage.setText(mainMessage);
        try {
            javaMailSender.send(simpleMailMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    //요약한 값 불러오기
    private String getSummaryNews(String newsId) {


        String url = "/data/news/api/news_summary/";
        log.info("getsummaryNews"  + newsId + "실행" + "경로는 " + url);
        Map<String, String> requestData = new HashMap<>();
        requestData.put("_id", newsId);

        String summaryNews = webClient.post()
                .uri(url)
                .bodyValue(requestData)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return summaryNews;

    }

    // 구독한 뉴스 5개 요청
    public List<String> getSubscribeNews(String company){
        String url = "/data/finance/stock_news/";

        Map<String, String> requestData = new HashMap<>();
        requestData.put("keyword", company);

        String response = webClient.post()
                .uri(url)
                .bodyValue(requestData)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        ObjectMapper mapper = new ObjectMapper();
        List<String> ids = new ArrayList<>();

        try {
            JsonNode rootNode = mapper.readTree(response);
            for (JsonNode node : rootNode){
                String id = node.get("_id").asText();
                ids.add(id);
            }
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ids ;
    }
}