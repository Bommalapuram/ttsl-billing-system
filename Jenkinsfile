pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'devpractice1'
        FRONTEND_IMAGE = 'frontend-service'
        BACKEND_IMAGE = 'backend-service'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('1. Code Sync') {
            steps { 
                checkout scm 
            }
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
pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'devpractice1'
        FRONTEND_IMAGE = 'frontend-service'
        BACKEND_IMAGE = 'backend-service'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('1. Code Sync') {
            steps { 
                checkout scm 
            }
        }
        stage('2. SonarQube Code Analysis') {
            steps {
                script {
                    // జెన్కిన్స్ లో మనం క్రియేట్ చేసిన sonar-token ని ఇక్కడ వాడుకుంటున్నాం
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        // సోనార్ స్కానర్ కమాండ్ రన్ చేయడం
                        sh "echo 'Running SonarQube Scan for TTSL Project...'"
                        // Note: రియల్-టైమ్‌లో ఇక్కడ sonar-scanner కమాండ్ రన్ అవుతుంది
                    }
                }
            }
        }
        stage('3. Build Frontend & Backend') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./src/frontend"
                    sh "docker build -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ./src/backend"
                }
            }
        }
        stage('4. Push Images to Registry') {
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
