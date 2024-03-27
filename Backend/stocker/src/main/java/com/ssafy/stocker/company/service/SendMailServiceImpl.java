package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.company.repository.UserCompanyRepository;
import com.ssafy.stocker.company.service.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SendMailServiceImpl implements SendMailService {

    private final UserCompanyRepository userCompanyRepository;
    private final JavaMailSender javaMailSender;

    public SendMailServiceImpl(UserCompanyRepository userCompanyRepository, JavaMailSender javaMailSender){
        this.userCompanyRepository = userCompanyRepository;
        this.javaMailSender = javaMailSender;
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
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setTo(userCompany.getUser().getEmail());
        simpleMailMessage.setSubject("뉴레카" + userCompany.getCompany().getCompanyName() + "에 대한 요약메시지");
        simpleMailMessage.setText(userCompany.getCompany().getCompanyName());


        try {
            javaMailSender.send(simpleMailMessage);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}