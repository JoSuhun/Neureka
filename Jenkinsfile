pipeline {
    agent any
    
    environment {
        DOCKER_CREDENTIALS = 'dockerhub'
    }

    stages {
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // 각 프로젝트 폴더에서 Docker 이미지를 빌드하고 Docker Hub에 푸시
                    buildAndPushImage('Frontend', DOCKER_CREDENTIALS)
                    buildAndPushImage('Backend', DOCKER_CREDENTIALS)
                    buildAndPushImage('Python', DOCKER_CREDENTIALS)
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Docker Compose를 사용하여 배포
                    sh 'docker compose up -d'
                }
            }
        }
    }
}

def buildAndPushImage(projectName, credentials) {
    // 프로젝트 폴더로 이동하여 Docker 이미지 빌드 및 푸시
    def lowercaseProjectName = projectName.toLowerCase()
    dir("${projectName}") {
        // Docker 이미지 빌드
        sh "docker build -t csw1511/neureka-${lowercaseProjectName}:latest ."
        sh "echo ${projectName} ${lowercaseProjectName}"

        // Docker Hub에 이미지 푸시
        withCredentials([usernamePassword(credentialsId: credentials, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
            sh "docker push csw1511/neureka-${lowercaseProjectName}:latest"
        }
    }
}