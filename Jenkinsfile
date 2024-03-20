pipeline {
    agent any

    environment {
        DOCKER_HOME = '/usr/bin' // Docker CLI가 설치된 경로
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                // Git pull
                checkout scm

                // Build Docker image for the changed folder
                script {
                    // Get the list of changed files
                    def changedFiles = sh(script: 'git diff --name-only HEAD^ HEAD', returnStdout: true).trim().split('\n')

                    // Check if any of the changed files are Dockerfiles
                    def dockerFiles = changedFiles.findAll { it.endsWith('Dockerfile') }

                    // Build Docker image for each folder containing Dockerfile
                    dockerFiles.each { dockerFile ->
                        def folderPath = dockerFile.substring(0, dockerFile.lastIndexOf('/'))
                        def imageName = "neureka-${folderPath.replace('/', '-')}"
                        sh "${DOCKER_HOME}/docker build -t ${imageName} ${folderPath}"
                    }

                    // Login to Docker Hub
                    sh 'echo "비밀번호" | docker login -u csw1511 --password-stdin https://registry.hub.docker.com'
                }
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                // Push Docker image to Docker Hub
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerImages = sh(script: "${DOCKER_HOME}/docker images --format \"{{.Repository}}:{{.Tag}}\"", returnStdout: true).trim().split('\n')
                        dockerImages.each { image ->
                            if (image.startsWith('neureka-')) {
                                sh "${DOCKER_HOME}/docker push ${image}"
                            }
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