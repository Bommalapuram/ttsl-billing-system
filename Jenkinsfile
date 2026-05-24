pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'user-two'   # <--- మనం ఫైనల్ గా సెలెక్ట్ చేసుకున్న కరెక్ట్ ఐడి
        FRONTEND_IMAGE = 'frontend-service'
        BACKEND_IMAGE = 'backend-service'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('1. Code Sync') {
            steps { checkout scm }
        }
        stage('2. Build Frontend & Backend') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./src/frontend"
                    sh "docker build -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ./src/backend"
                }
            }
        }
        stage('3. Push Images to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                        sh "docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}"
                        sh "docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}"
                    }
                }
            }
        }
    }
}
