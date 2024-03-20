pipeline {
    agent any

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
                        docker.build(imageName)
                    }
                }
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                // Push Docker image to Docker Hub
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerImages = docker.images()
                        dockerImages.each { image ->
                            def imageName = image.id.replaceFirst('^.*?/', '')
                            def imageNameParts = imageName.tokenize(':')
                            def imageNameWithoutTag = imageNameParts[0]
                            if (imageNameWithoutTag.startsWith('neureka-')) {
                                docker.image(image.id).push('latest')
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
