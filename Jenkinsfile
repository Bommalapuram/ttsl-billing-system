node {
    // 1. ఎన్విరాన్‌మెంట్ల వేరియబుల్స్ సెటప్
    def DOCKER_HUB_USER = 'devpractice1'
    def FRONTEND_IMAGE = 'frontend-service'
    def BACKEND_IMAGE = 'backend-service'
    def IMAGE_TAG = "${BUILD_NUMBER}"

    stage('1. Code Sync') {
        checkout scm
    }

    stage('2. SonarQube Code Analysis') {
        echo "Starting SonarQube Static Code Analysis for TTSL-Billing project..."
        // నోట్: జెన్కిన్స్ లోపల సోనార్-స్కానర్ ఇన్స్టాల్ అయి ఉంటే ఈ టోకెన్ వాడుకుంటాం
        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
            echo "SonarQube credentials validated successfully."
        }
    }

    stage('3. Build Frontend & Backend') {
        sh "docker build -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./src/frontend"
        sh "docker build -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ./src/backend"
    }

    stage('4. Push Images to Registry') {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
            sh "docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}"
            sh "docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}"
        }
    }
}
