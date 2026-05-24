node {
    // 1. ఎన్విరాన్‌మెంట్ల వేరియబుల్స్ సెటప్ (ఇక్కడ మీ సర్వర్ 1 ఒరిజినల్ ఐపి ఇవ్వాలి)
    def SONAR_SERVER_URL = 'http://54.196.196.79:9000/' 
    def DOCKER_HUB_USER = 'devpractice1'
    def FRONTEND_IMAGE = 'frontend-service'
    def BACKEND_IMAGE = 'backend-service'
    def IMAGE_TAG = "${BUILD_NUMBER}"

    stage('1. Code Sync') {
        checkout scm
    }

    stage('2. SonarQube Code Analysis') {
        echo "Executing Live Dockerized SonarQube Scanner for TTSL-Billing project..."
        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
            // డాకర్ కంటైనర్ ద్వారా సోనార్ స్కానర్ రన్ చేసి డేటాను డాష్‌బోర్డ్‌కి పంపడం
            sh """
            docker run --rm \
              -v "${WORKSPACE}:/usr/src" \
              sonarsource/sonar-scanner-cli \
              -Dsonar.projectKey=ttsl-telecom-billing \
              -Dsonar.projectName=ttsl-telecom-billing \
              -Dsonar.sources=/usr/src/src \
              -Dsonar.host.url=${SONAR_SERVER_URL} \
              -Dsonar.token=${SONAR_TOKEN}
            """
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
