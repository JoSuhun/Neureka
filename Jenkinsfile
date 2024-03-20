pipeline {
    agent any

    environment {
        DOCKER_HOME = '/usr/bin' // Docker CLI가 설치된 경로
    }

    stages {
        stage('Build and Push Docker Images') { // 단일 단계로 변경됨
            steps {
                // Git pull
                checkout scm

                // Build and push Docker images for all Dockerfiles in Frontend, Backend, Python folders
                script {
                    def folders = ['Frontend', 'Backend', 'Python'] // 변경된 부분: 세 폴더 추가

                    folders.each { folder ->
                        def dockerFiles = sh(script: "find ${folder} -name 'Dockerfile'", returnStdout: true).trim().split('\n') // 변경된 부분: 폴더 내 모든 Dockerfile 찾기

                        dockerFiles.each { dockerFile ->
                            def imageName = dockerFile.tokenize('/')[0] // 변경된 부분: Dockerfile이 위치한 폴더명을 이미지 이름으로 사용
                            sh "${DOCKER_HOME}/docker build -t ${imageName} ${dockerFile}"
                            sh "${DOCKER_HOME}/docker push ${imageName}" // 변경된 부분: 이미지를 바로 푸시(push)
                        }
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                // Run Docker Compose
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
