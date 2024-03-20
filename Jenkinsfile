pipeline {
    agent any
    
    stages {
        stage('Build and Push Docker Images') {
            steps {
                script {
                    // 각 프로젝트 폴더에서 Docker 이미지를 빌드하고 Docker Hub에 푸시
                    buildAndPushImage('Frontend')
                    buildAndPushImage('Backend')
                    buildAndPushImage('Python')
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

def buildAndPushImage(projectName) {
    // 프로젝트 폴더로 이동하여 Docker 이미지 빌드 및 푸시
    dir("${projectName}") {
        // Docker 이미지 빌드
        sh "docker build -t yourdockerhubusername/neureka-${projectName}:latest ."
        // Docker Hub에 이미지 푸시
        sh "docker push yourdockerhubusername/neureka-${projectName}:latest"
    }
}
