# jdk17 Image Start
FROM openjdk:17 AS builder

# Gradle wrapper 복사
COPY gradlew ./
COPY gradle ./gradle
RUN chmod +x ./gradlew

# 프로젝트 의존성 빌드
COPY build.gradle settings.gradle ./
COPY src ./src
RUN ./gradlew build --no-daemon

# 기본 이미지 선택
FROM openjdk:17

# jar 파일 복제
COPY build/libs/*.jar app.jar

EXPOSE 8080

# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]

