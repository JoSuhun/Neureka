pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // 각 프로젝트 폴더에서 Docker 이미지를 빌드하고 Docker Hub에 푸시
                    buildAndPushImage('frontend', DOCKER_CREDENTIALS)
                    buildAndPushImage('backend', DOCKER_CREDENTIALS)
                    buildAndPushImage('python', DOCKER_CREDENTIALS)
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                // Docker Compose를 사용하여 배포
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }
    }
}

def buildAndPushImage(projectName, credentials) {
    // 프로젝트 폴더로 이동하여 Docker 이미지 빌드 및 푸시
    dir("${projectName}") {
        // Docker 이미지 빌드
        sh "docker build -t csw1511/neureka-${projectName}:latest -t csw1511/neureka-${projectName}:$((git rev-parse --short HEAD)) ."

        // Docker Hub에 이미지 푸시
        withCredentials([usernamePassword(credentialsId: credentials, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
            sh "docker push csw1511/neureka-${projectName}:latest"
            sh "docker push csw1511/neureka-${projectName}:$((git rev-parse --short HEAD))"
        }
    }
}