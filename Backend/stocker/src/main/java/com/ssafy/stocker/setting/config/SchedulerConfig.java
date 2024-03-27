package com.ssafy.stocker.setting.config;


import com.ssafy.stocker.company.service.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SchedulerConfig {
    private final SendMailService sendMailService;

    public SchedulerConfig (SendMailService sendMailService){
        this.sendMailService = sendMailService;
    }


    @Scheduled(initialDelay = 0 , fixedDelay = Long.MAX_VALUE)
    public void sendMail() {
        sendMailService.sendMail();
    }
}
