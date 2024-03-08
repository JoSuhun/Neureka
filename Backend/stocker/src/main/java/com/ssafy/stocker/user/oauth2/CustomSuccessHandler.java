package com.ssafy.stocker.user.oauth2;

import com.ssafy.stocker.user.dto.CustomOAuth2User;
import com.ssafy.stocker.user.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private RedisTemplate<String, String> redisTemplate;

    @Value("${access.token.expiration.time}")
    private Long accessExpireMs ;

    @Value("${refresh.token.expiration.time}")
    private Long refreshExpireMs ;
    public CustomSuccessHandler(JWTUtil jwtUtil, RedisTemplate<String, String> redisTemplate) {

        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();



        // 권한을 찾아서 권한 설정해줌
        // authentication.getAuthorities()를 호출하여
        // 현재 사용자에게 부여된 권한을 나타내는 GrantedAuthority 객체의 컬렉션을 얻습니다.
        // 이 컬렉션에는 사용자가 가진 모든 권한이 포함되어 있습니다.
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();



        String access = jwtUtil.createJwt("access", username, role, accessExpireMs);
        String refresh = jwtUtil.createJwt("refresh", username, role, refreshExpireMs);

        log.info("accesstoken : " + access);
        log.info("refreshtoken" + refresh);


        //redis 에 담아서 reftoken 관리
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        vop.set(username, refresh, refreshExpireMs , TimeUnit.MILLISECONDS);


        response.setHeader("Authorization" , access);
        response.addCookie(createCookie("refresh", refresh));
        response.sendRedirect("http://localhost:5173/");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
