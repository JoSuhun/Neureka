# jdk17 Image Start
FROM openjdk:17 AS builder

# Gradle wrapper 복사
COPY stocker/gradlew ./
COPY stocker/gradle ./gradle
RUN chmod +x ./gradlew

# 프로젝트 의존성 빌드
COPY stocker/build.gradle stocker/settings.gradle ./
COPY stocker/src ./src
RUN ./gradlew build --no-daemon

# 기본 이미지 선택
FROM openjdk:17

# 인자 설정 - JAR_File
ARG JAR_FILE=stocker/build/libs/*.jar

# jar 파일 복제
COPY ${JAR_FILE} app.jar


EXPOSE 8080
# 인자 설정 부분과 jar 파일 복제 부분 합쳐서 진행해도 무방
#COPY build/libs/*.jar app.jar

# 실행 명령어
ENTRYPOINT ["java", "-jar", "app.jar"]

